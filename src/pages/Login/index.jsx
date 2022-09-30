import React from "react";
import logo from "./sd_logo.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../redux/slices/login";
import { Navigate } from "react-router-dom";

function Login() {
  const [isLoading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      setErrorMessage(true);
      setLoading(false);
    }
    if ("access_token" in data.payload) {
      window.localStorage.setItem("sd_token", data.payload.access_token);
      setLoading(false);
    }
  };
  const isAuth = useSelector(selectIsAuth);
  if (isAuth) {
    return <Navigate to={"/ticket"} />;
  }

  // if (isAuth) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className={"mx-auto h-36 w-auto fill-primary"}
            src={logo}
            alt="sd_logo"
          />
          {/* <svg
            className={'mx-auto h-12 w-auto fill-primary'}
            viewBox="0 0 5000 1554"
            xmlns="http://www.w3.org/2000/svg">
            <path d="m544.5 1-128 .5-16 3.8C334.6 20.9 304.9 31 263.7 51.6c-49.3 24.7-88.6 54.2-131.7 99C70.5 214.4 27.4 297.1 9.6 385.1c-4.9 24.3-6.7 39.8-7.7 64.9-1.4 39.8-2.3 514.9-1 594.5 1.2 75 1.6 82 6.1 109.3 7.6 45.2 22.6 91.6 42.9 132.8 24 48.6 51.1 86.4 90.1 125.4 39.3 39.4 77.9 67.4 127 92 52.1 26.1 113.5 44.3 159.5 47.1 23.5 1.4 396.1 2.8 787.9 2.8l342.8.1-.6-525.8c-.3-289.1-1-539.4-1.5-556.2-1-31.6-2.8-50.2-7.7-77-14.8-81.5-50.8-158.6-103.6-222-13.9-16.7-43.3-46.2-59.3-59.6-73-60.7-149.8-95-245-109.4-11.6-1.8-21.6-2.3-58.5-3-45.6-.9-308.6-.9-536.5 0zm108.1 234.8c5.4 4.9 21 19.6 34.5 32.8 25 24.4 35.5 33.4 39 33.4 3.2 0 11.3-8.5 24.9-26 7.1-9.1 15.3-19.2 18.2-22.4 9.5-10.5 11.9-9 34.1 20.4 15 20 22.3 28 25.4 28 3.6 0 15.8-10.7 45.6-39.8 15.6-15.3 30.8-29.4 33.9-31.6 5.2-3.5 6-3.8 10.2-3.2l4.6.7v38.8c0 21.3.3 52.3.7 68.9l.6 30.1 5.6 2.2c17.8 7.1 52.8 24.1 69.1 33.7 15.3 8.9 37.5 24.2 51.9 35.8 16.5 13.2 43.7 39.6 57.4 55.7 56.1 65.7 91.4 144.8 102.2 228.7 2.4 19.2 3.4 106.3 3.5 311.2V1213h-191.7c-186.4-.1-264.5-.9-292.3-3-44.4-3.5-93.9-17.5-140.5-39.9-46.4-22.3-83.1-48.4-120-85.5-48.7-48.8-83-104.1-104.5-168.6-24.4-73.1-29.1-149.2-14-226.5 10.5-53.3 33.1-107.1 65.3-155.5 13.6-20.5 26.8-36.1 51.6-61.3 32.4-33 56.6-52.2 89.6-71.2 18.3-10.6 53.9-28.1 63.5-31.3l9.5-3.1.6-64.8c.6-66.1.8-70.1 4.5-73.8 3.3-3.3 6.6-1.9 17 7.3z" />
            <path d="M751.5 607.5c-63.2 10.3-114.9 53.3-135.4 112.8-22.2 64.3-6.1 132.8 42.1 179.2 21.1 20.4 42.5 33.1 72.8 43.1 11.4 3.7 11.6 3.7 33.5 4.5 12.1.4 59.3.8 104.9.8l82.8.1-.6-32.8c-.3-18-.8-52.3-1.1-76.2-.6-48.1-2-83.8-3.6-94.5-1.6-10.1-8.1-29.3-14.3-42-23.7-48.3-67.3-82-121.1-93.5-13.2-2.9-46.4-3.7-60-1.5zM3836.2 56c-44.6 6.3-77.1 32.9-86.4 70.8-3 12-2.9 32.2.1 43.7 6.7 25.2 24.2 46.2 48.9 58.5 17 8.4 35.2 12.2 59.2 12.2 35.7 0 63.4-9.8 83-29.4 17.1-17.1 25.5-36.5 26.7-61.5 1.2-25.7-5.5-45.4-21.1-62-14.6-15.7-31.7-25-56.1-30.4-10.2-2.3-43.2-3.4-54.3-1.9zM2005.5 141c-69.6 5.1-119.1 21.2-161.9 52.7-12.8 9.5-30.1 27-38.8 39.3-14.2 20.1-24.7 45-28.9 68.9-2.4 13.5-2.9 42.1-1 56.1 4.5 32.6 15.7 56.5 37.2 79.5 11.1 11.8 29.5 24.7 49.9 35 25.7 13 72.5 27.4 118.5 36.5 28.5 5.7 63.2 13.8 72.7 17 17.4 6 28.2 13 32.4 21.1 2.8 5.5 3 13.7.4 19.7-5.6 13.1-20.7 19.2-53.1 21.4-61 4.1-131.6-12-192.6-43.8L1826 537l-1.4 3.3c-.7 1.7-14.5 32.9-30.5 69.1-16.1 36.3-29 66.5-28.7 67.1.2.6 6.6 4.3 14.3 8.2 64.9 33.3 158.7 52.3 245.8 49.9 76.4-2.1 129.6-17.1 175.8-49.7 42.2-29.8 69.1-73.7 74.7-122.1 1.6-13.3.8-39.6-1.5-52.8-3.2-18.4-9.9-35.3-20-50.5-11.3-17-23.3-28.7-42-41-20.9-13.8-39.4-22.5-67.1-31.5-22.6-7.3-41.7-11.9-85.9-20.5-43.6-8.6-57.4-11.9-70.4-16.9-18.9-7.3-26.1-15.2-26.1-28.3 0-17 14.6-28.1 42.8-33 13.6-2.3 47.2-2.2 64.7.1 37.4 5.1 74.3 16.4 113.4 34.7 6.1 2.9 11.3 5 11.4 4.8 1-1.2 56.7-136.6 56.7-137.6 0-.7-5.3-3.9-11.7-7.2-43.7-21.8-91.9-34.7-152.3-40.6-18.7-1.9-65.9-2.7-82.5-1.5zM2535.3 270.1c-66.4 4.2-125.4 29.7-167.9 72.6-34.1 34.4-53.4 74.4-60.6 125.8-1.9 13.6-1.6 50.4.5 64.5 11.1 72.3 53 129.7 120.2 164.6 29.7 15.4 62.6 25.1 102 30.1 17.2 2.1 68.6 2.5 86.5.5 61.8-6.8 107.9-26.5 144.9-62.2l7.5-7.1-20-20.2c-10.9-11.1-32.5-32.9-47.9-48.4l-28-28.2-10.5 7.1c-19.6 13.1-39.3 21.2-57.4 23.7-11.4 1.6-38.5 1.4-49.6-.4-11.5-1.9-24-6.1-31.8-10.6-8.6-5.1-22.9-20-27.3-28.4-2-3.9-4-8-4.4-9.3l-.6-2.2h308l.6-4.3c1.6-11.5 2.3-41.2 1.4-56.4-2.6-43.7-13.5-78.2-34.6-110.3-27.4-41.5-67.6-71.1-119.3-87.8-35.1-11.3-72-15.7-111.7-13.1zm42.7 126.6c14.3 3.3 29.3 13.2 37.3 24.6 6.7 9.4 14.7 26.5 14.7 31.4 0 1.1-12.3 1.3-71.6 1.3h-71.6l.7-3.8c1.1-5.9 6-17.5 10.5-24.6 15.7-24.8 47.9-36.5 80-28.9zM3158.4 270.1c-47.3 3.4-86.9 19.3-115 46.1l-9.4 9V277h-174v445h183V618.1c0-114.7.2-118.9 6.1-136.6 4.2-12.5 8.1-18.8 16.8-27.5 12.3-12.1 28.6-20 48.5-23.5 13.6-2.3 48.8-1.7 61.4 1l2.2.5V269l-4.2.1c-2.4.1-9.3.5-15.4 1zM4246.1 270.1c-69.6 4.5-130.5 29.6-173.8 71.9-46.6 45.5-68.1 103.1-64.2 172.2 1.9 33.6 9.1 60.7 24 89.8 33 64.3 102.6 110 186.7 122.4 41.8 6.2 89.3 4.2 127.2-5.4 65.6-16.6 116.5-58 138.7-112.8 3.7-9.1 3.7-9.4 1.8-10.5-4.7-2.6-139.7-68.8-139.9-68.5-.2.2-2.4 4.3-5 9.1-12.6 23.4-29.3 38.5-50.1 45.4-7.1 2.4-9.6 2.7-22 2.7-10.5 0-15.6-.4-20.5-1.7-27-7.5-45.9-27.7-52.6-56.3-3.8-16.4-3.5-43.8.6-59.9 6.9-27.4 26.4-47.1 53.5-54.1 10.3-2.6 27.6-2.4 37.8.4 22.7 6.4 40.7 22.2 53.7 47.3l4.5 8.6 18-8.8c9.9-4.9 41.7-20.6 70.8-34.9 29-14.2 52.7-26.3 52.7-26.8 0-1.5-5-13.2-9.2-21.6-23.2-46.3-68-81.6-124.3-97.9-20.9-6.1-38.9-9-64.5-10.7-18.4-1.1-24.4-1.1-43.9.1zM4733.8 270c-66.2 4.9-122.1 28.4-164.1 69-19.5 18.8-33 37.2-44.2 60.2-22.9 47-28.4 104.8-14.9 158 9.1 36.1 27.9 69.1 54.9 96.4 49.9 50.3 120.7 76.4 206.9 76.4 81.7-.1 140.4-20.1 186.6-63.6 3.8-3.7 7-7.1 7-7.7 0-.5-21.4-22.5-47.6-48.8l-47.6-47.7-10.7 7c-17.6 11.6-33.3 18.8-49 22.4-9.1 2.1-43.4 3-54 1.5-26.2-3.9-43.5-13-56.5-30-3.6-4.7-11.6-18.8-11.6-20.6 0-.3 69.5-.5 154.4-.5h154.3l1.3-20.6c3.1-49.6-3.5-90.4-20.5-126.2-19.2-40.3-54.4-76-95.6-96.7-18.8-9.5-46.9-19.1-68.5-23.5-22.9-4.5-57.5-6.7-80.6-5zm41.8 126.5c23.3 5.3 41.8 22.9 50.5 48.4 3.5 10.2 11.7 9.1-69.6 9.1h-71.4l.6-3.3c1.2-6.4 6.5-18.8 11.2-25.9 15.8-24.2 47-35.4 78.7-28.3zM3190 277.7c0 .4 40.1 100.6 89.2 222.5l89.2 221.8h190.1l89-221.2c49-121.6 89.1-221.8 89.3-222.5.3-1.1-14.9-1.3-86.5-1.1l-86.8.3-47 117.3c-25.8 64.4-47.5 117.9-48 118.8-.8 1.2-10.8-24.4-42.9-109.8-23-61.2-43.2-114.8-44.8-119.1l-3-7.7h-93.9c-51.6 0-93.9.3-93.9.7zM3766 499.5V722h184l-.2-222.3-.3-222.2-91.7-.3-91.8-.2v222.5zM3456 1189.5V1491h184v-52.8l.1-52.7 14.7-15.4 14.8-15.4 53.8 68.2 53.8 68.1H3999l-7.2-9.2c-60.1-76.1-190.8-242.4-190.7-242.8 0-.3 41.1-43.5 91.3-96l91.2-95.5-216.1-.6-63.7 64.3-63.8 64.3V888h-184v301.5zM1800 1206.5V1491h149.8c92 0 155.1-.4 163.7-1 74.3-5.4 133.7-25.7 182.8-62.3 54.9-41 89.1-97.1 100.7-165.4 3.2-19.4 4.2-32.5 4.2-56.8 0-25.2-1.5-41.8-5.7-63.5-21.2-108.7-107.6-187.9-230.9-211.9-39.1-7.6-50.9-8.1-220.3-8.1H1800v284.5zm295.5-133.4c51.8 6.3 89.8 35.6 104.9 81 5.8 17.3 7 26.4 7.1 51.9 0 25.6-1.3 35.5-7.1 52.9-6.6 20.1-15.9 34.8-30.7 48.7-20.2 19-48.2 30.5-81.2 33.3-6.6.6-31 1.1-54.2 1.1H1992v-270h47.3c28 0 50.8.4 56.2 1.1zM2666 1039.6c-24.1 2.8-40 5.9-57.2 10.9-83.8 24.7-145.3 88.7-161.2 167.7-3.7 18.1-4.7 29.1-4.8 49.8 0 43 9.4 79 29.6 113.4 23.7 40.2 64.5 74.8 111.3 94.2 41.4 17.2 83.8 24.3 138.3 23.1 39.7-.9 65.3-4.8 94.2-14.4 31-10.2 64.4-30.6 84.8-51.7l4.4-4.6-6.9-7.3c-3.8-3.9-25.3-25.7-47.8-48.3l-40.8-41-11.1 7.3c-20 13.2-37.3 20.4-56.3 23.3-11.8 1.9-39 1.7-50.4-.4-20.9-3.7-33.9-10.1-46.6-23-6.2-6.2-9.2-10.2-12.8-17.2-2.5-5-4.4-9.4-4-9.8.3-.3 69.8-.6 154.4-.6h153.7l.8-12.8c2.3-33.1.6-64.4-4.8-89.2-9.6-44.7-35.7-86.7-72.6-116.9-25.6-20.8-63.1-38.2-100.4-46.5-22.5-5-30.7-5.8-61.3-6.1-15.9-.2-30.6-.1-32.5.1zm49.6 126.4c14.4 3.7 27.2 11.7 35.9 22.8 5.2 6.4 12.7 21.1 14.9 28.9l1.5 5.3H2624l.6-2.8c1.6-6.6 6.6-18.7 10.1-24.5 8.6-14.2 24.4-25.6 41.4-29.7 10.6-2.6 29.1-2.6 39.5 0zM3169 1039.6c-46.7 4.1-79.9 13-113 30.1-17.1 8.8-29.5 17.8-42.6 30.8-15.5 15.5-24.7 30.2-31.3 50-5.8 17.6-7.6 40.4-5 62 5 40.9 26.5 70.2 65.7 89.5 25.9 12.8 61.3 21.1 118 27.5 17.3 2 35 4.3 39.5 5.1 11.7 2.2 23.2 6.1 26.5 8.9 6.8 5.7 6.7 13.5-.4 20.2-8.5 8.2-24.4 10.9-59.4 10-46.9-1.2-92.5-11.9-130.9-30.8-9-4.4-16.5-7.9-16.6-7.7-.7.7-48.8 116.5-49.2 118.5-.4 1.9.7 2.8 8.3 6.6 38.5 19.3 97.3 33.4 157.9 37.8 18.1 1.3 67.2.7 83-1.1 43.9-4.8 75.6-14 106-30.8 39.4-21.8 65.3-55.4 73.2-94.9 2.3-11.6 2.2-35.9-.1-49.8-7.1-42.3-32.3-71.5-77.7-90-8-3.3-33.4-10.6-45.9-13.3-9.5-2.1-47.8-7.7-73-10.7-26.9-3.2-40.4-6.3-48.6-11-5.4-3.1-7.4-6.4-7.4-11.9 0-5.3 2.9-9.3 9.7-13.3 8.5-4.9 17.6-6.5 42.1-7 25.9-.6 37.2.3 61.7 5.2 27.4 5.5 42 10.3 63.8 21.1l10.8 5.4 2-4.8c6.1-14.1 47.9-115.1 47.9-115.7 0-.3-5.1-3-11.2-6-27.2-13-62.4-21.8-109.4-27.6-13.6-1.6-24.1-2.1-53.4-2.4-20.1-.1-38.5-.1-41 .1z" />
          </svg> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Войдите в свой аккаунт
          </h2>
          <p className={"mt-2 text-center text-sm text-gray-600"}>
            Введите данные для входа
          </p>
          {errorMessage && (
            <p
              className={
                "text-center text-sm text-rose-600 font-bold transition-all delay-75"
              }
            >
              Неправильный Логин или пароль
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Логин
              </label>
              <input
                {...register("login", { required: true })}
                id="email-address"
                name="login"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-md"
                placeholder="Логин"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                {...register("password", { required: true })}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-md"
                placeholder="Пароль"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                {" "}
                Запомнить меня{" "}
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Забыли свой пароль?{" "}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg
                  className="h-5 w-5 text-red-200 group-hover:text-red-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5  h-5 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Войти в ServiceDesk"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
