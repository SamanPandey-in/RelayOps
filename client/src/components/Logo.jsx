import logoSrc from '../assets/logo.png';
import { Zap } from 'lucide-react';

const Logo = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* <img src={logoSrc} alt="Logo" className="w-8 h-8" size={28} /> */}
      <Zap className="text-white fill-current" size={28} />
      <span className="text-2xl font-black tracking-tighter text-white uppercase">Heed</span>
    </div>
  )
}

export default Logo