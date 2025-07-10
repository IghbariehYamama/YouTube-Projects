from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.tools import tool
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv
import os

load_dotenv()

@tool
def calculator(a: float, b: float) -> str:
    """"Useful for performing basic arithmeric calculations with numbers"""
    print("Tool has been called")
    return f"the sum of {a} and {b} is {a + b}"

@tool
def say_hello(name: str) -> str:
    """"Useful for greeting a user"""
    print("Tool has been called")
    return f"Hello {name}, I hope you are well today"

def main():
    # Use "gemini-2.5-flash" from Google AI Studio
    model = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0,
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    tools = [calculator, say_hello]
    agent_executer = create_react_agent(model, tools)

    print("Welcome! I'm your AI assistant. Type 'quit' to exit.")
    print("You can ask me to perform calculations or chat with me.")

    while True:
        user_input = input("\nYou: ").strip()

        if user_input.lower() == "quit":
            break

        print("\nAssistant: ", end="")
        try:
            for chunk in agent_executer.stream({"messages": [HumanMessage(content=user_input)]}):
                if "agent" in chunk and "messages" in chunk["agent"]:
                    for message in chunk["agent"]["messages"]:
                        print(message.content, end="")
        except Exception as e:
            print(f"\n[Error] {e}")
        print()

if __name__ == "__main__":
    main()
