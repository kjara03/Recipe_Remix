import React from "react";
import './SignupForm.css';

const SignupForm = () => {
    return (
        <div class="wrapper">
            <form>
                <h4>Signup</h4>
                <div class="mb-3">
                    <label for="Username" class="form-label">Username</label>
                    <input type="username" class="form-control" id="Username" />
                </div>
                <div class="mb-3">
                    <label for="InputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="youremail@example.com" />
                </div>
                <div class="mb-3">
                    <label for="InputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="InputPassword1" />
                </div>

                <button type="submit" class="btn btn-signup">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;