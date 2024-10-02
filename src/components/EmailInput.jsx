import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

const EmailInput = ({ emails, setEmails }) => {
    const [email, setEmail] = useState('');

    const handleAddEmail = (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && emailPattern.test(email) && !emails.includes(email)) {
            setEmails([...emails, email]);
            setEmail('');
        }
    };

    const handleRemoveEmail = (event,index) => {
        event.preventDefault();
        setEmails(emails.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddEmail(e);
        }
    };

   


    return (
        <div>
            <div className="flex mb-2">
                <input
                    type="email"
                    onKeyDown={handleKeyDown}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Add email"
                />
{/* // icons */}


   

                {/* <button
                    onClick={handleAddEmail}
                    className="ml-2 bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm rounded-lg px-3 py-2.5"
                >
                    Add
                </button> */}
            </div>
            <ul className="flex flex-wrap gap-2">
                {emails.map((email, index) => (
                    <li key={index} className="flex items-center bg-gray-200 rounded-lg p-2 text-gray-900 text-sm">
                        {email}
                        <button
                            onClick={(event) => handleRemoveEmail(event,index)}
                            className="ml-2 text-red-500"
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmailInput;
