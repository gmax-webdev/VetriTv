'use client';

import React, { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
  FaLink,
} from 'react-icons/fa';
import './ShareIcons.css';
import { supabase } from '@/lib/supabaseClient';

interface ShareIconsProps {
  postId: number;
  postUrl: string;
  showLabels?: boolean;
}

export default function ShareIcons({ postId, postUrl, showLabels = false }: ShareIconsProps) {
  const [copied, setCopied] = useState(false);

  const incrementShare = async () => {
    try {
      await supabase.rpc('increment_shares', { row_id: postId });
    } catch (error) {
      console.error('Failed to increment shares:', error);
    }
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    incrementShare();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    incrementShare();
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons = [
    {
      icon: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`,
      label: 'Share on Facebook',
      className: 'fb',
    },
    {
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${postUrl}`,
      label: 'Share on Twitter',
      className: 'tw',
    },
    {
      icon: <FaWhatsapp />,
      url: `https://wa.me/?text=${postUrl}`,
      label: 'Share on WhatsApp',
      className: 'wa',
    },
    {
      icon: <FaTelegramPlane />,
      url: `https://t.me/share/url?url=${postUrl}`,
      label: 'Share on Telegram',
      className: 'tg',
    },
  ];

  return (
    <div className="share-icons">
      {buttons.map(({ icon, url, label, className }) => (
        <button
          key={label}
          className={`icon-button ${className}`}
          onClick={() => handleShare(url)}
          title={label}
          type="button"
        >
          {icon}
          {showLabels && <span className="label-text">{label}</span>}
        </button>
      ))}
      <button
        className="icon-button copy"
        onClick={handleCopy}
        title="Copy Link"
        type="button"
      >
        <FaLink />
        {showLabels && <span className="label-text">Copy Link</span>}
      </button>
      {copied && <p className="copy-feedback">Link copied!</p>}
    </div>
  );
}
