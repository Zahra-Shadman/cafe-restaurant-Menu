import { ToastContainer, toast } from "react-toastify";

export const notifySuccess = () => toast("!محصول با موفقیت اضافه شد");
export const notifyUnSuccess = () => toast("خطا در اضافه شدن محصول! لطفا مجدد اقدام کنید ");
export const loginSuccess = () => toast("!ورود با موفقیت انجام شد ");
export const GoingToDashoeard = () => toast("در حال انتقال به صفحه داشبورد");
export const TokenEspieard = () => toast("توکن شما منقضی شده است ! لطفا مجدد وارد شوید");
export const EditSuccess = () => toast("!ویرایش محصول با موفقیت انجام شد");
export const LoginError = () => toast("خطا در ورود! لطفا مجدد اقدام کنید ");
export const SignupSuccessful  =() => toast.success("ثبت نام با موفقیت انجام شد ! خوش آمدید");