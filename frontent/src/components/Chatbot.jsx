import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'வணக்கம்! Atheefa Wholesale-க்கு உங்களை வரவேற்கிறேன். நான் உங்களுக்கு எப்படி உதவ முடியும்?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle user message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    // Smart automated responses based on user keywords (Rules + Intent matching)
    setTimeout(() => {
      let botResponse = "மன்னிக்கவும், உங்கள் கேள்வியை என்னால் முழுமையாகப் புரிந்து கொள்ள முடியவில்லை. தயவுசெய்து எங்களை நேரடியாகத் தொடர்பு கொள்ளவும்.";
      
      const lowerMsg = userMessage.toLowerCase();

      if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('வணக்கம்')) {
        botResponse = "வணக்கம்! இன்று உங்களுக்கு என்ன மளிகைப் பொருட்கள் தேவை?";
      } else if (lowerMsg.includes('price') || lowerMsg.includes('விலை') || lowerMsg.includes('cost')) {
        botResponse = "எங்கள் ஸ்டோர் பக்கத்தில் அனைத்து பொருட்களின் விலைகளும் தெளிவாகக் குறிப்பிடப்பட்டுள்ளன. நீங்கள் 'Store' பக்கத்தைப் பார்வையிடலாம்!";
      } else if (lowerMsg.includes('order') || lowerMsg.includes('delivery') || lowerMsg.includes('ஆர்டர்') || lowerMsg.includes('விநியோகம்')) {
        botResponse = "நீங்கள் கார்ட்டிற்குச் சென்று (Cart) உங்கள் விவரங்களை நிரப்பி எளிதாக ஆர்டர் செய்யலாம். ஆர்டர் செய்த பிறகு 'Orders' பக்கத்தில் அதன் நிலையைக் கண்காணிக்கலாம்.";
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('help') || lowerMsg.includes('உதவி')) {
        botResponse = "உங்களுக்கு உடனடி உதவி தேவைப்பட்டால் எங்களது வாடிக்கையாளர் சேவை எண்ணைத் தொடர்பு கொள்ளவும்.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-tr from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <h4 className="font-black text-sm">Atheefa Assistant</h4>
                <span className="text-[10px] text-indigo-200 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-lg font-bold w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm shadow-indigo-100'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (thought => (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl text-xs text-slate-400 border border-slate-200/80 shadow-sm animate-pulse">
                  యோசிக்கிறது... (Typing...)
                </div>
              </div>
            )())}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestions */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setInput('விலை என்ன?')}
              className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-bold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              💰 விலைகள்
            </button>
            <button
              onClick={() => setInput('ஆர்டர் செய்வது எப்படி?')}
              className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-bold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              📦 ஆர்டர் செய்வது எப்படி?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="உங்கள் கேள்தியை இங்கே எழுதவும்..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

export default Chatbot;