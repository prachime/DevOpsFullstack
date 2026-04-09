from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from datetime import date, timedelta

# ✅ Supabase config
url = "https://mjuhpxynvpuucqeuatfh.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdWhweHludnB1dWNxZXVhdGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Mjg0OTYsImV4cCI6MjA5MTMwNDQ5Nn0.3WOgedD6rvQrG--Up_3g3CvRh67nf5Ewr8jMIfxA--g"

supabase = create_client(url, key)

# ✅ FastAPI app
app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Health API
@app.get("/health")
def health():
    return {"status": "ok"}

# ✅ Supabase query function
def get_articles(topic=None):
    query = supabase.table("articles").select("title, views")

    if topic:
        query = query.ilike("topic", f"%{topic}%")

    response = query.execute()
    return response.data

# ✅ Chat API
@app.post("/chat")
def chat(query: dict):
    user_query = query.get("message", "").lower()
    data = []

    if "ai" in user_query:
        data = get_articles("AI")
    elif "trending" in user_query and "last 30 days" in user_query:
        # last 30 days date
        today = date.today()
        last_30_days = today - timedelta(days=30)

        data = supabase.table("articles")\
            .select("title, views")\
            .gte("created_at", str(last_30_days))\
            .order("views", desc=True)\
            .execute().data
    else:
        data = get_articles()

    return {
        "message": f"You asked: {query.get('message')}",
        "data": data
    }

@app.get("/test-db")
def test_db():
    response = supabase.table("articles").select("*").execute()
    return response.data    