import { useState } from "react"
import { useAuthStore } from "../store/authStore";


function ForgetPassword() {
    const [ email, setEmail ] = useState();
    const { forgetPassword, isLoading, error } = useAuthStore();

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            await forgetPassword(email);
            alert('reset email sent successfully')
        } catch (error) {
           console.log(error); 
        }
    }
  return (
    <div className='w-full h-screen bg-gradient-to-bl from-amber-400 to-amber-600 flex justify-center items-center text-2xl text-amber-50 font-bold'>
      <div className='w-full max-w-md px-4'>
        <main className="w-full">
          <form onSubmit={handleForgetPassword} className="bg-gradient-to-b from-blue-950 to-blue-800 rounded-2xl w-full overflow-hidden"> {/* Removed p-10, added overflow-hidden */}
            <h2 className='w-full py-4 bg-green-600 text-center'>Forget Password</h2>
            <div className="p-6"> 
              
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className='w-full mt-2 mb-4 p-2 border-2 border-white rounded-lg'
              />
              
			  {isLoading ? <input
			  	type="button"
                value="proccessing" 
                className='w-full bg-amber-800 text-white font-bold py-2 px-4 rounded cursor-pointer'
              /> : 
			  <input 
                type="submit" 
                value="forget password" 
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
export default ForgetPassword