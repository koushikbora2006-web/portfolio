import { userData } from '../../data/userData';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              &lt;Koushik /&gt;
            </span>
            <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
              Building modern web applications with passion.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href={userData.socialLinks.github} target="_blank" rel="noreferrer" className="text-light-muted hover:text-primary dark:text-dark-muted dark:hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <FaGithub className="w-6 h-6" />
            </a>
            <a href={userData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-light-muted hover:text-primary dark:text-dark-muted dark:hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="w-6 h-6" />
            </a>
            {userData.socialLinks.twitter !== '#' && (
              <a href={userData.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-light-muted hover:text-primary dark:text-dark-muted dark:hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-light-muted dark:text-dark-muted">
            &copy; {currentYear} {userData.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
