const Logo = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet="/DarkModeLogo.svg" />
        <img src="/LightModeLogo.svg" alt="Heed logo" />
      </picture>
    </div>
  )
}

export default Logo