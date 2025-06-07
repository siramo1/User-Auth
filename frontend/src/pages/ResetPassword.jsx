import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";


function ResetPassword() {
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const navigate = useNavigate();
    const { resetPassword, isLoading, error } = useAuthStore();

    const { token } = useParams();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
           alert('password did not match') ;
           return;
        }
        try {
            await resetPassword(token, password);
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-full h-screen bg-gradient-to-bl from-amber-400 to-amber-600 flex justify-center items-center text-2xl text-amber-50 font-bold'>
      <div className='w-full max-w-md px-4'>
        <main className="w-full">
          <form onSubmit={handleResetPassword} className="bg-gradient-to-b from-blue-950 to-blue-800 rounded-2xl w-full overflow-hidden"> {/* Removed p-10, added overflow-hidden */}
            <h2 className='w-full py-4 bg-green-600 text-center'>Sign Up</h2>
            <div className="p-6"> 
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className='w-full mt-2 mb-4 p-2 border-2 border-white rounded-lg'
              />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className='w-full mt-2 mb-4 p-2 border-2 border-white rounded-lg'
              />
			  {isLoading ? <input
			  	type="button"
                value="proccessing" 
                className='w-full bg-amber-800 text-white font-bold py-2 px-4 rounded cursor-pointer'
              /> : 
			  <input 
                type="submit" 
                value="reset password" 
                className='w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded cursor-pointer'
              /> }
              
			  {error && <div className='text-red-600'>{error}</div>}
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
export default ResetPassword