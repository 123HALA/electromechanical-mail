import { BrowserRouter as Router, Routes, Route, Link, useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Inbox, Send, FileText, Menu, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { allEmails } from './data/emails';
import { Email } from './lib/types';
import { ComposePage } from './pages/ComposePage';

const folderIcons = {
  inbox: <Inbox className='w-5 h-5' />,
  sent: <Send className='w-5 h-5' />,
  drafts: <FileText className='w-5 h-5' />,
};

function EmailClientLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <aside className={`fixed z-20 inset-y-0 left-0 w-64 bg-gray-100 dark:bg-gray-800 p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <h1 className='text-2xl font-bold mb-6'>Shobole</h1>
        <Link to='/compose' className='w-full mb-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700'>
          <Pencil className='w-5 h-5 mr-2' />
          Compose
        </Link>
        <nav className='space-y-2'>
          {Object.keys(allEmails).map(folder => (
            <NavLink
              key={folder}
              to={`/${folder}`}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`
              }
            >
              {folderIcons[folder as keyof typeof folderIcons]}
              <span className='capitalize'>{folder}</span>
              <span className='ml-auto text-xs font-semibold'>{allEmails[folder as keyof typeof allEmails].length}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className='flex-1 flex flex-col'>
         <header className='flex items-center justify-between p-4 border-b md:hidden'>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className='p-2'>
            <Menu className='w-6 h-6' />
          </button>
          <h1 className='text-xl font-bold'>Umeme Flow</h1>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

function EmailListPage() {
  const { folder = 'inbox' } = useParams<{ folder: keyof typeof allEmails }>();
  const emails = allEmails[folder] || [];

  return (
    <div className='flex-1 overflow-y-auto'>
       <div className='p-4 border-b'>
         <h1 className='text-2xl font-semibold capitalize'>{folder}</h1>
       </div>
       <ul className='divide-y dark:divide-gray-700'>
        {emails.map(email => (
          <li key={email.id}>
            <Link to={`/${folder}/${email.id}`} className={`block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${!email.read ? 'font-bold' : ''}`}>
              <div className='flex justify-between'>
                <p className='truncate'>{email.sender}</p>
                <p className='text-sm text-gray-500'>{new Date(email.timestamp).toLocaleDateString()}</p>
              </div>
              <p className='truncate'>{email.subject}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmailViewPage() {
  const { folder = 'inbox', emailId } = useParams<{ folder: keyof typeof allEmails, emailId: string }>();
  const navigate = useNavigate();
  const email = allEmails[folder]?.find(e => e.id === emailId);

  if (!email) {
    return <div className='p-8 text-center'>Email not found.</div>;
  }

  return (
    <div className='flex-1 overflow-y-auto p-4 md:p-6'>
       <div className='flex items-center gap-4 mb-6'>
        <button onClick={() => navigate(`/${folder}`)} className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
            <ArrowLeft className='w-6 h-6' />
        </button>
        <h1 className='text-2xl font-semibold truncate'>{email.subject}</h1>
       </div>
       <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-4'>
            <div>
                <p className='font-semibold'>{email.sender}</p>
                <p className='text-sm text-gray-500'>To: {email.recipient}</p>
            </div>
            <p className='text-sm text-gray-500'>{new Date(email.timestamp).toLocaleString()}</p>
        </div>
        <div className='prose dark:prose-invert max-w-none whitespace-pre-wrap'>
            {email.body}
        </div>
       </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<EmailClientLayout />}>
            <Route index element={<EmailListPage />} />
            <Route path=':folder' element={<EmailListPage />} />
            <Route path=':folder/:emailId' element={<EmailViewPage />} />
          </Route>
          <Route path='/compose' element={<ComposePage />} />
        </Routes>
      </Router>
    </>
  );
}
