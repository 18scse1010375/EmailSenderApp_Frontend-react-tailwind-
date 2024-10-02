import React, { useState, useRef } from "react"
import toast, { Toaster } from "react-hot-toast";
//import { sendEmail } from "../services/email.service";


import { sendEmailWithFiles } from "../services/email.service";

import { sendEmailWithoutFile } from "../services/email.service";

import EmailInput from "./EmailInput";

import { Editor } from '@tinymce/tinymce-react';
function EmailSender() {

    // const [emailData, setEmailData] = useState(
    //     { from: '', to: '', subject: '', message: '' }
    // );

    const [emailData, setEmailData] = useState(
        { from: '', to: [], subject: '', message: '' }
    );

    //  const [file, setFile] = useState(null);

    const [files, setFiles] = useState([]);


    const editorRef = useRef(null);



    const [sending, setSending] = useState(false)

    const [error, setError] = useState('');


    // function handleFieldChange(event, name) {
    //       setEmailData({ ...emailData, [name]: event.target.value })
      

    //     if (name === 'to' || name === 'subject' || name == 'from')
    //         setError('')

    // }

    function handleFieldChange(event, name) {
        let value = event.target.value;
    
        if (name === 'to') {
            value = value.split(',').map(email => email.trim());
        }
    
        setEmailData({ ...emailData, [name]: value });
    
        if (name === 'to' || name === 'subject' || name === 'from') {
            setError('');
        }
    }


    function handleFileChange(event) {
        setFiles([...files, ...Array.from(event.target.files)]);
    }

      function handleFileRemove(event,index) {
        event.preventDefault();
        setFiles(files.filter((_, i) => i !== index));
    }


    //updated

    async function submitHandler(event) {
        console.log("submit function is calling..")
        event.preventDefault();
        if (emailData.from === "" || emailData.to.length === 0 || emailData.subject === "") {
            setError("Field can't be empty");
            return;
        }
    
        setError('');
        console.log("submit Function is calling..")
    
        console.log(emailData);
    
        console.log("Files are===>", files)
    
        if (emailData.from === "" || emailData.to.length === 0 || emailData.subject === "" || editorRef.current.getContent() === "") {
            toast.error("Invalid Details..");
            return;
        }
    
        else {
            try {
                setSending(true);
                const formData = new FormData();
                formData.append('request', new Blob([JSON.stringify({
                    from: emailData.from,
                    to: emailData.to,
                    subject: emailData.subject,
                    message: editorRef.current.getContent(),
                })], { type: 'application/json' }));
    
                if (files.length > 0) {
                    files.forEach((file) => {
                        formData.append("files", file);
                    });
                    await sendEmailWithFiles(formData);
                } else {
                    await sendEmailWithoutFile(emailData);
                }
    
                toast.success("Email sent successfully");
                setEmailData({ from: "", to: [], subject: "", message: editorRef.current.setContent('') });
                setFiles([]);
            } catch (error) {
                console.log(error);
                toast.error("Email Not Sent");
            } finally {
                setSending(false);
            }
        }
    }
    



    // async function submitHandler(event) {
    //     console.log("submit function is calling..")
    //     event.preventDefault();
    //     if (emailData.from==="" || emailData.to === "" || emailData.subject === "") {
    //         setError("Field can't be empty");

    //         return;
    //     }

    //     setError('');
    //     console.log(" submit Function is calling..")

    //     console.log(emailData);

    //     console.log("Files are===>", files)

    //     if (emailData.from=="" || emailData.to == "" || emailData.subject == "" || editorRef.current.getContent() == "") {
    //         toast.error("Invalid Details..");
    //         return;
    //     }

    //     else {
    //         try {
    //             setSending(true)
    //             const formData = new FormData();
    //             formData.append('request', new Blob([JSON.stringify({
    //                 from : emailData.from , 
    //                 to: emailData.to,
    //                 subject: emailData.subject,
    //                 message: emailData.message,
    //             })], { type: 'application/json' }));

    //             if (files.length > 0) {

    //                 files.forEach((file) => {
    //                     formData.append("files", file)
    //                 })

    //                 await sendEmailWithFiles(formData)
    //             }


    //             else {
    //                 await sendEmailWithoutFile(emailData)
    //             }


    //             // for (let i = 0; i < files.length; i++) {
    //             //     formData.append('files', files[i]);
    //             // }
    //             //   console.log("form data==>",formData)
    //             // await sendEmail(formData);
    //             //await sendEmail(emailData,files)
    //             toast.success("Email sent successfully")
    //             setEmailData({ from :"" , to: "", subject: "", message: editorRef.current.setContent('') })

    //             setFiles([])

    //             //editorRef.current.setContent('')





    //         } catch (error) {
    //             console.log(error)
    //             toast.error("Email Not Sent")
    //         }

    //         finally {
    //             setSending(false)

    //         }
    //     }
    // }

    return (

        <div className="w-full min-h-screen flex justify-center items-center">

            <Toaster />

            {/* <h1>Welcome to Email Sender Application</h1> */}

            <div className="bg-white email_card1 w-1/3 p-4 rounded border shadow">
                <h1 className="text-2xl">Email Sender</h1>
                <p className="text-sm text-gray-700 mb-3">Send Email to your favourite person with your own app....</p>




                <form onSubmit={submitHandler} class="max-w-sm mx-auto">

                    <div class="mb-2">
                        <label for="email" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">From</label>
                        <input value={emailData.from} onChange={(event) => handleFieldChange(event, "from")} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="From" />
                    </div>

                    <div class="mb-1">

                        {emailData.from === '' && error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>


                    <div className="mb-2">
                        <label htmlFor="to" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">To</label>
                        <EmailInput emails={emailData.to} setEmails={(emails) => setEmailData({ ...emailData, to: emails })} />
                    </div>


                    {/* <div class="mb-2">
                        <label for="email" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">To</label>
                        <input value={emailData.to} onChange={(event) => handleFieldChange(event, "to")}  id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="To" />
                    </div> */}

                    <div class="mb-1">

                        {emailData.to === '' && error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>

                    <div class="mb-2">
                        <label for="subject" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                        <input value={emailData.subject} onChange={(event) => handleFieldChange(event, "subject")} placeholder="Enter here" type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div class="mb-1">

                        {emailData.subject === '' && error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    {/* <div class="mb-5">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea value={emailData.message} onChange={(event) => handleFieldChange(event, "message")} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div> */}
                    <div class="mb-3">
                        <label for="message" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Your Message  </label>




                        <Editor onEditorChange={(event) => {
                            setEmailData({ ...emailData, 'message': editorRef.current.getContent() })

                        }}

                            onInit={(evt, editor) => {
                                editorRef.current = editor
                            }}
                            apiKey='zsvni9aut9tqlsfnx2n5sfx4em5xrsx0nbcs0fojou0qiz6g'

                            init={{
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            initialValue="Welcome to TinyMCE!"
                        />

                    </div>


                    {/* <div className="mb-3">                   
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Attachment</label>
<input onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" multiple/>

</div> */}


                    {/* <div className="mb-3">  

<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload multiple files</label>
<input onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />

</div> */}


                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload multiple files</label>
                        <input multiple onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600" id="multiple_files" type="file" />
                    </div>


                    <div className="mb-3">
                        <h3 className="text-sm font-medium text-gray-900">Selected Files:</h3>
                        {/* <ul>
                            {files.map((file, index) => (
                                <li key={index} className="text-sm text-gray-700">{file.name}</li>
                            ))}
                        </ul> */}


                        <ul>
                            {files.map((file, index) => (
                                <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                                    {file.name}
                                    <button onClick={(event) => handleFileRemove(event,index)} className="text-red-500 ml-2">x</button>
                                </li>
                            ))}
                        </ul>






                    </div>




                    {


                        sending && <div className="loader flex-col gap-1 items-center flex justify-center mb-1" role="status ">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>

                            <h2>Sending Email..</h2>
                        </div>
                    }


                    <div className="button_container flex justify-center gap-3">
                        <button disabled={sending} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Email</button>
                        <button type="reset" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Clear</button>
                    </div>

                </form>




            </div>


        </div>

    )
}


export default EmailSender