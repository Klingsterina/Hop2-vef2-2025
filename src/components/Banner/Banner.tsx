import Link from 'next/link';
import '../../Styles/banner.scss';

type BannerProps = {
    isLoggedIn: boolean;
    username?: string;
  };
  
  export default function Banner({ isLoggedIn, username }: BannerProps) {
    return (
      <div className="banner">
        {isLoggedIn ? (
          <div className="banner-user">
            <span className="banner-button">{username}</span>
            <span className="banner-divider" />
            <span className="banner-icon">👤</span>
          </div>
        ) : (
          <div className="banner-user">
            <Link href="/register" className="banner-button">Register</Link>
            <Link href="/signin" className="banner-button">Sign in</Link>
            <span className="banner-divider" />
            <span className="banner-icon">👤</span>
          </div>
        )}
      </div>
    );
}