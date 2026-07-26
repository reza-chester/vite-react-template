import Card from "../components/Card";
import IrancellLogoFa from "../assets/irancell-logo-fa.png";
import IrancellLogoEn from "../assets/irancell-logo-en.png";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import i18n from "../i18n";
import InputComp from "../components/InputComp";
import { useEffect } from "react";
import ButtonCom from "../components/ButtonCom";
import { createApiEndpoint } from "../lib/axios";

// interface LoginData {
//   username: string;
//   password: string;
// }

// interface LoginResponse {
//   token: string;
//   expireDate:Date
// }
export default function Login() {
  const lang = i18n.language;
  const { t } = useTranslation("login");
  const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const loginSchema = z.object({
    username: z
      .string()
      .min(5, { message: t("errorusername") })
      .regex(/\./, {
        message: t("errorusername"),
      }),
    password: z
      .string()
      .min(6, { message: t("errorpassword") })
      .regex(
        passregex,
        { message: t("errorpassword") }
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
      await loginApi.post<unknown>({
        username: data.username,
        password: data.password,
      })
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("ورود با موفقیت انجام شد!");
      reset();
    } catch (error) {
      console.error("خطا در ورود:", error);
      alert("خطا در ورود، لطفاً مجدداً تلاش کنید");
    }
  };
useEffect(() => {
  
    reset()
}, [i18n.language])

  return (
    <Card
      className={"login-card text-center"}
      children={
        <>
          <div className="flex flex-col w-full">
            <img
              className="login-logo"
              src={lang == "en" ? IrancellLogoEn : IrancellLogoFa}
            />

            <p className="login-eyebrow font">{t("p1")}</p>
            <h1 className="login-name font-Ibold">{t("p2")}</h1>
            <p className="login-heading">{t("entersignin")}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 ">
                <label className=" text-[#bfc4cc] text-[12px] text-start ms-2">
                  {t("usernamelabel")}
                </label>
                <InputComp
                  type="text"
                  placeholder={t("enterusername")}
                  onChange={(a:any)=> console.log(a)}
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-start ms-2 text-[#f5222d] text-[11px]">
                    {errors.username.message}
                  </span>
                )}
                <label className=" text-[#bfc4cc] text-[12px] text-start ms-2 mt-1">
                  {t("passlabel")}
                </label>

                <InputComp
                  type="password"
                  placeholder={t("enterpass")}
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-start ms-2 text-[#f5222d] text-[11px]">
                     {errors.password.message}
                  </span>
                )}
              </div>
              
              <ButtonCom
              type="submit"
              className="login-btn mt-9 mb-5"
              children={t("enterbutton")}
              />

          
            </form>

      
          </div>
        </>
      }
    />
  );
}
