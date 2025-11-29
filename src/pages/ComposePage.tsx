import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export function ComposePage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject');
    toast.success(`Email '${subject}' sent successfully!`);
    setTimeout(() => navigate('/sent'), 1500);
  };

  return (
    <div className='flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900/40'>
      <Toaster richColors />
      <div className='flex items-center gap-4 mb-6'>
        <Link to='/' className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
            <ArrowLeft className='w-6 h-6' />
        </Link>
        <h1 className='text-2xl font-semibold'>Compose Email</h1>
      </div>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='recipient' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>To</label>
          <input type='email' id='recipient' name='recipient' className='mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div>
          <label htmlFor='subject' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Subject</label>
          <input type='text' id='subject' name='subject' className='mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required />
        </div>
        <div>
          <label htmlFor='body' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Body</label>
          <textarea id='body' name='body' rows={12} className='mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' required></textarea>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <Send className='w-5 h-5 mr-2' />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
