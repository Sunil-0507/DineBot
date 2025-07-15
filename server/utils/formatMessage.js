const formatMessage = (sender, text, type = 'text') => {
  return {
    sender,          
    text,            
    type,            
    timestamp: new Date().toISOString()
  };
};

export default formatMessage;
