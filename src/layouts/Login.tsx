import Card from "../components/Card";
import IrancellLogoFa from "../assets/irancell-logo-fa.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComp from "../components/InputComp";
import ButtonCom from "../components/ButtonCom";
import { createApiEndpoint } from "../lib/axios";

interface LoginData {
  username: string;
  password: string;
}


export default function Login() {
  const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const loginSchema = z.object({
    username: z
      .string()
      .min(5, { message:  "حداقل 5 کاراکتر"})
      .regex(/\./, {
        message: "لطفا با شکل صحیح نام کاربری خود را وارد نمایید",
      }),
    password: z
      .string()
      .min(6, { message: "حداقل 6 کاراکتر" })
      .regex(
        passregex,
        { message: "لطفا با شکل صحیح پسورد خود را وارد نمایید" }
      ),
  });
  type LoginFormData = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {

    try {
      const loginApi = createApiEndpoint('Login');
      const logdata:LoginData={
        username: data.username,
        password: data.password,
      }
      await loginApi.post<unknown>(logdata)
      alert("ورود با موفقیت انجام شد!");
      reset();
    } catch (error) {
      console.error("خطا در ورود:", error);
      alert("خطا در ورود، لطفاً مجدداً تلاش کنید");
    }
  };

  return (
    <Card
      className={"text-center p-6 w-1/3"}
      children={
        <>
          <div className="flex flex-col w-full items-center justify-center gap-2">
            <img
             className="w-25 mb-2"
              src={IrancellLogoFa}
            />
  <h1 className="login-name font-Ibold">titr2</h1>

            <p className="login-eyebrow font">titr1</p>
          
            <form onSubmit={handleSubmit(onSubmit)} className="w-full rtl">
              <div className="flex flex-col gap-2 ">
                <label className="text-(--primary)/85  text-[12px] text-start ms-2">
                نام کاربری (username)
                </label>
                <InputComp
                className="ltr text-start placeholder:text-end! border"
                  type="text"
                  placeholder={"نام کاربری خود را وارد نمایید"}
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-start ms-2  text-xs text-error">
                    {errors.username.message}
                  </span>
                )}
                <label className="text-(--primary)/85 text-[12px] text-start ms-2 mt-1">
                رمز عبور (password)
                </label>

                <InputComp
                className="ltr text-start placeholder:text-end! border"
                  type="password"
                  placeholder={"رمز عبور خود را وارد نمایید"}
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-start ms-2  text-xs text-error">
                     {errors.password.message}
                  </span>
                )}
              </div>
              
              <ButtonCom
              type="submit"
              className="login-btn mt-9 mb-5 border"
              children={"ورود"}
              />

          
            </form>

      
          </div>
        </>
      }
    />
  );
}
