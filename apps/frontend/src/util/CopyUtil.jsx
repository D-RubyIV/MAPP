import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
const CopyToClipboardComponent = ({ textToCopy, onCopy, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    toast("Copied!")
    onCopy && onCopy(); // Optional callback for custom actions on copy
  };

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
      {children}
    </CopyToClipboard>
  );
};

export default CopyToClipboardComponent;