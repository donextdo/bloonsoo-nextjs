
const UserProfile = ({ email}:any) => {
    let initials;
  if (email){
    initials = email?.charAt(0).toUpperCase()
    
  }else{

  }
 
    return (
      <div className="text-xl font-semibold text-white">
        {/* <span className="text-2xl font-semibold text-green-700"> */}
        
        {initials}
        {/* </span> */}
      </div>
    )
  }
  
  export default UserProfile