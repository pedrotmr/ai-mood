const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[100dvh] w-screen items-center justify-center bg-black">
      {children}
    </div>
  )
}

export default AuthLayout
