import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY; 

const SYSTEM_PROMPT = `
You are an AI assistant on Ashirwad Kumar's personal portfolio website. 
Your role is to help visitors learn about Ashirwad's skills, experience, projects, and achievements.

Always respond in a friendly, professional, and concise manner. 
If you do not know something specific about Ashirwad, say honestly that the information is not available.

========================
ABOUT ASHIRWAD
========================
Ashirwad Kumar is a Computer Science undergraduate pursuing a B.Tech in Computer Science Engineering at Graphic Era University.
He is in 3rd year of his studies. And his hobbies are ruuning and competitive programming.
He has a strong interest in:
- Full-stack development
- Artificial Intelligence
- Data Science
- Competitive Programming
- Algorithm design and system building

He enjoys building practical applications that combine strong algorithms with real-world usability.

========================
TECHNICAL SKILLS
========================

Programming Languages:
- C++
- Python
- JavaScript
- C
- Java

Frontend Development:
- React.js
- HTML
- CSS
- TailwindCSS

Backend Development:
- Node.js
- Express.js
- REST APIs
- Flask

Databases:
- SQL
- Basic database design
- PostgreSQL

AI / Machine Learning:
- Logistic Regression
- Statistical analysis
- Data preprocessing
- ANOVA analysis
- Correlation and covariance analysis

Other Tools & Technologies:
- Git and GitHub
- Postman
- VS Code

========================
COMPETITIVE PROGRAMMING
========================

Ashirwad is an active competitive programmer.

Achievements:
- Solved 1000+ algorithmic problems across platforms.
- LeetCode rating: ~2126(Guardian on LeetCode)
- CodeChef rating: ~1700(3 Star on CodeChef)

He regularly practices:
- Data Structures and Algorithms
- Dynamic Programming
- Graph Algorithms
- Greedy algorithms
- Trees
- Recursion
- Advanced problem solving

He enjoys solving challenging algorithmic problems and improving his problem-solving speed and accuracy.

========================
PROJECTS
========================

1. Intelligent Relocation and POI Optimization System Source Code
• Building a Relocation Platform to identify optimal living regions based on user POI priority(hospitals, schools etc).
• Implemented interactive geospatial visualization using Leaflet.js map enabling dynamic plotting of regions on the
map in real time.
• Integrated PostgreSQL with PostGIS to store and query geospatial data, implementing radius-based search,
spatial indexing and optimized queries for eﬀicient query fetching.
• Developing a full-stack architecture (React and Node.js REST APIs) to connect geospatial computations with a
dynamic UI allowing users to explore and compare regions in real time according to their priority.

Tech Stack:
- React.js
- Node.js
- Express.js
- PostgreSQL
- Leaflet.js for maps

Features:
- Modern responsive UI
- Backend APIs
- Database storage
- Real-time city matching functionality

--------------------------------------------------

2. Personal Portfolio Website
Ashirwad built his own portfolio website to showcase his projects, achievements, and technical skills.

Tech Stack:
- React.js
- Modern frontend design
- Interactive UI components

Features:
- Project showcase
- Skills section
- Contact section
- AI chatbot assistant

--------------------------------------------------

3. Generic Medicine Finder System
A project that helps users find cheaper generic alternatives to branded medicines and locate nearby stores.

Core Idea:
Users input a medicine name, and the system suggests generic alternatives and shows nearby stores where the medicine is available.

Tech Stack:
- C++
- Graph Algorithms
- Dijkstra’s Algorithm
- Data structures

Features:
- Medicine to generic mapping
- Store inventory system
- Shortest path computation
- Graph with multiple nodes representing locations

--------------------------------------------------

4. Health Risk Prediction System
A machine learning project that analyzes health indicators and predicts obesity risk levels.

Dataset:
- Obesity dataset with features like height, weight, BMI, and age.

Tech Stack:
- Python
- Logistic Regression
- Statistical Analysis
- Matplotlib
- Pandas
- Scikit-learn

Key Concepts Used:
- Logistic regression classification
- ANOVA statistical testing
- Correlation and covariance analysis
- Data visualization

Features:
- Predict obesity risk
- Analyze BMI trends across age groups
- Generate statistical insights from health data

--------------------------------------------------

5.E-Commerce Customer Intelligence Platform
• Developed a full-stack e-commerce platform allowing users to browse products, filter by category, manage carts, and
place orders.
• Built and optimized a relational database with ER modeling and normalization to enhance query performance.
• Implemented K-Means Clustering for real-time customer segmentation to provide insights on seasonal trends and
purchasing patterns.
• Built a responsive frontend using HTML, CSS, and JavaScript integrated with a Flask backend and MySQL
Database for API handling and data management.


6.Club Activity Management System
• Developed a Full-Stack Club Activity Management System that allows students to explore clubs, view activities, and
access detailed event information through a dynamic web interface.
• Built the backend using Python Flask and MySQL, implementing relational database design with foreign key
constraints to manage clubs and activities while ensuring automatic activity status updates based on event time.
• Implemented database-driven UI rendering, where clubs and activities are fetched dynamically from the database,
enabling admins to add/remove clubs and activities without modifying frontend code.
• Designed a responsive frontend using HTML, CSS, and Jinja templating, integrating secure authentication, session
management, and REST-style routes for eﬀicient navigation.


7.Cervical Cancer Prediction
• Implemented a Machine Learning pipeline to predict cervical cancer risk with high accuracy.
• Used an XGBoost classifier that achieved a robust F1-score of 0.94, significantly outperforming baseline models with
an accuracy of 93%.
• Developed comprehensive data visualizations using Seaborn and Matplotlib to interpret feature importance and
model predictions effectively.


========================
EDUCATION
========================

B.Tech in Computer Science Engineering  
Graphic Era University

Academic Performance:
- CGPA: 8.43

========================
PERSONAL TRAITS
========================

Ashirwad is known for:
- Strong problem-solving skills
- Consistent competitive programming practice
- Building practical projects
- Curiosity about AI and modern software systems

He actively learns new technologies and enjoys combining algorithms with full-stack systems.

========================
ASSISTANT BEHAVIOR RULES
========================

1. Answer questions about Ashirwad's skills, projects, education, and achievements.
2. Encourage visitors to explore his projects.
3. Keep answers clear and concise.
4. If information is missing, respond honestly rather than guessing.
5. If someone asks how to contact Ashirwad, suggest using the contact section of the portfolio.
6. If someone has asked about a specific project, provide a brief overview and mention the tech stack used.

Your goal is to represent Ashirwad professionally and help visitors understand his work and abilities.
`;

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! 👋 I'm Ashirwad's AI assistant. Ask me anything about his work, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.map(({ role, content }) => ({ role, content })),
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't get a response. Please try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong. Check your API key or network." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "58px", height: "58px", borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          border: "none", cursor: "pointer", fontSize: "24px",
          boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
          zIndex: 9999, display: "flex", alignItems: "center",
          justifyContent: "center", transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Chat with AI Assistant"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div style={{
          position: "fixed", bottom: "94px", right: "24px",
          width: "360px", height: "500px", borderRadius: "20px",
          background: "#0f0f1a", border: "1px solid rgba(99,102,241,0.3)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.5)", display: "flex",
          flexDirection: "column", zIndex: 9998,
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          overflow: "hidden", animation: "slideUp 0.25s ease",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            padding: "16px 18px", display: "flex", alignItems: "center", gap: "10px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>🤖</div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>
                Ashirwad's Assistant
              </div>
              {/* <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>
                Powered by Groq · LLaMA 3
              </div> */}
            </div>
            <div style={{
              marginLeft: "auto", width: "8px", height: "8px",
              borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80",
            }} />
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "14px",
            display: "flex", flexDirection: "column", gap: "10px",
            scrollbarWidth: "thin", scrollbarColor: "#333 transparent",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1e1e30",
                  color: msg.role === "user" ? "white" : "#d1d5db",
                  fontSize: "14px", lineHeight: "1.5",
                  border: msg.role === "assistant" ? "1px solid rgba(99,102,241,0.2)" : "none",
                  whiteSpace: "pre-wrap", wordBreak: "break-word",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "12px 16px", borderRadius: "16px 16px 16px 4px",
                  background: "#1e1e30", border: "1px solid rgba(99,102,241,0.2)",
                  display: "flex", gap: "5px", alignItems: "center",
                }}>
                  {[0, 1, 2].map((dot) => (
                    <div key={dot} style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "#6366f1", animation: `bounce 1.2s ease infinite`,
                      animationDelay: `${dot * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px", borderTop: "1px solid rgba(99,102,241,0.2)",
            display: "flex", gap: "8px", background: "#0f0f1a",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Ashirwad's work..."
              disabled={isLoading}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: "12px",
                border: "1px solid rgba(99,102,241,0.3)", background: "#1e1e30",
                color: "white", fontSize: "14px", outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.3)")}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: isLoading || !input.trim() ? "#2a2a40" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                fontSize: "18px", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}
            >➤</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}