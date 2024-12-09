import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/Button";
import InputField from "../../components/inputfied";
import Logo from "../../components/Logo";
import { userSchema } from "../../lib";
import { signUp } from "../../services/authServices";
import { useState } from "react";
import { toast } from "react-toastify";

type UserForm = z.infer<typeof userSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    setLoading(true);
    // console.log(values);
    try {
      const response = await signUp(values);
      toast.success(response?.data?.message);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error occured while siging up"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex   ">
      <div className="w-7/12 h-screen bg-primary bg-pattern2 opacity-50 hidden sm:block" />
      <div className="w-96 h-fit bg-card rounded-md      py-5 px-8 mx-3 self-center relative bottom-16">
        <Link to={"/"}>
          <Logo />
        </Link>
        <p className="mt-2 mb-5">Get started with you second brain.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 h-full"
        >
          <InputField
            label="Username"
            name="username"
            register={register}
            error={errors.username}
            placeholder="Tyler Durden"
          />
          <InputField
            label="Password"
            name="password"
            register={register}
            error={errors.password}
            placeholder="Password"
            type="password"
          />
          <Button
            loading={loading}
            text="Sign Up"
            type="default"
            action={"submit"}
          />
        </form>
        <p className="text-sm mt-4 font-medium">
          Already a second brain?{" "}
          <Link
            to={"/sign-in"}
            className="text-primary underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
