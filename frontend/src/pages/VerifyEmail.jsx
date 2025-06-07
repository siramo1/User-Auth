import { useState } from "react"
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { verifyEmail } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus to next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(code.join("")); // Join array into string
      navigate('/user-profile');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>verify email</div>
      <form onSubmit={handleVerify}>
        <label htmlFor="code-0">input your code</label>
        <div className="flex gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border-2 border-amber-300 text-2xl h-12 w-12 text-center"
            />
          ))}
        </div>
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default VerifyEmail