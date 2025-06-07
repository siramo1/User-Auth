import { useAuthStore } from "../store/authStore";

function UserProfile() {
  const { logout, user, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    logout();
  }

  if(isAuthenticated) console.log('user is autheticated')

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-32 font-medium">Name:</span>
          <span>{user.name || 'Not provided'}</span>
        </div>
        
        <div className="flex items-center">
          <span className="w-32 font-medium">Email:</span>
          <span>{user.email}</span>
          {user.isVerified && (
            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Verified
            </span>
          )}
        </div>
        
        {user.username && (
          <div className="flex items-center">
            <span className="w-32 font-medium">Username:</span>
            <span>{user.username}</span>
          </div>
        )}
        
        
        
        {user.createdAt && (
          <div className="flex items-center">
            <span className="w-32 font-medium">Member since:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        )}
        <div><button onClick={handleLogout} className='border-2 border-green-400 bg-gradient-to-b from-green-500 to-green-700 text-center px-6 p-2 rounded-lg hover:p-3 hover:px-6'>logout</button></div>
      </div>
      
     
    </div>
  );
}

export default UserProfile;