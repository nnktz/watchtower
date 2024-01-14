'use client'

import { faFacebook, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SocialMediaLinks = () => {
  const socials = [
    {
      href: 'https://github.com/nnktz',
      icon: faGithub,
    },
    {
      href: 'https://www.youtube.com/channel/UCEbImU4di9h_QYsAaAJRUaw',
      icon: faYoutube,
    },
    {
      href: 'https://www.facebook.com/nhatnguyen.KTz/',
      icon: faFacebook,
    },
  ]

  return (
    <div className="flex gap-4">
      {socials.map((social) => (
        <a href={social.href} key={social.href} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={social.icon} size="2x" />
        </a>
      ))}
    </div>
  )
}
