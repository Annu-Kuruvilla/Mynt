import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp =() => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
     fullName: "",
     email: "",
     password: "",
    });

   const handleSignUp = async (e) => {
    e.preventDefault();

    const newErrors = {
    fullName: "",
    email: "",
    password: "",
  };
  

  let isValid = true;

  if (!fullName.trim()) {
    newErrors.fullName = "Enter full name";
    isValid = false;
  }

  if (!validateEmail(email)) {
    newErrors.email = "Enter a valid email address";
    isValid = false;
  }

  if (!password || password.length < 8) {
    newErrors.password = "Enter valid password";
    isValid = false;
  }

  setErrors(newErrors);

  if (!isValid) return;

  // Signup api
};


    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                
                <form onSubmit={handleSignUp}>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col col-span-1">
                        <Input
                            value={fullName}
                            onChange={({target}) => setFullName(target.value)}
                            label= "Full Name"
                            placeholder={"John Doe"}
                            type="text"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                      </div>

                    <div className="flex flex-col col-span-1">
                        <Input
                            value={email}
                            onChange={({target}) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@email.com"
                            type="text"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                      </div>
                    </div>

                    <div className="flex flex-col col-span-1">
                        <Input
                            value={password}
                            onChange={({target}) => setPassword(target.value)}
                            label="Password"
                            placeholder="Min 8 characters"
                            type="password"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                      )}
                    </div>

                     {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        Sign Up
                    </button>

                     <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link className="font-medium text-purple-800 underline" to="/login">
                            Log In
                        </Link> 
                    </p>
                </form>
            </div>


        </AuthLayout>
    )
}

export default SignUp