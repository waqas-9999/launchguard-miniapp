import React, { useState } from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

type ProjectUpdate = {
  id: number;
  title: string;
  highlight: string;
  description: string;
  date: string;
  release: string;
};

const updates: ProjectUpdate[] = [
  {
    id: 7,
    title: 'BCX WALLET BETA TESTING ANNOUNCEMENT',
    highlight: '',
    description: 'We’ll be selecting 50 testers ahead of our upcoming beta wallet launch.',
    date: 'Aug 01, 2025',
    release: 'PROJECT RELEASE 07',
  },
  {
    id: 6,
    title: 'BCX Wallet Beta',
    highlight: 'Launch Date Announced!',
    description: 'We’re thrilled to announce that the BCX Wallet will officially enter beta testing on the announced date.',
    date: 'July 25, 2025',
    release: 'PROJECT RELEASE 06',
  },
  {
    id: 5,
    title: 'BCX Is Now Officially',
    highlight: 'Audited by CertiK',
    description: 'This audit sets the stage for our wallet beta launch and adds credibility to our infrastructure.',
    date: 'July 19, 2025',
    release: 'PROJECT RELEASE 05',
  },
  {
    id: 4,
    title: 'Momentum Builds Up',
    highlight: 'Live Wallet Demo + Exchange Progress',
    description: 'BCX shares a live demo of the wallet and updates on our native exchange integration.',
    date: 'June 22, 2025',
    release: 'PROJECT RELEASE 04',
  },
  {
    id: 3,
    title: 'Design Preview Is Here',
    highlight: 'A Visual Leap Forward',
    description: 'First look at the upcoming non-custodial BCX wallet UI.',
    date: 'May 19, 2025',
    release: 'PROJECT RELEASE 03',
  },
  {
    id: 2,
    title: 'Where We Are',
    highlight: 'A Message From The BCX Team',
    description: 'BCX shares major milestones and outlines what’s ahead.',
    date: 'April 26, 2025',
    release: 'PROJECT RELEASE 02',
  },
  {
    id: 1,
    title: 'Borderless Payments',
    highlight: 'Endless Possibilities with BCX',
    description: 'BCX announces its highly anticipated public token presale and next-gen payment infrastructure.',
    date: 'December 19, 2024',
    release: 'PROJECT RELEASE 01',
  },
];

const ITEMS_PER_PAGE = 3;

const ProjectUpdates: React.FC = () => {
  const [page, setPage] = useState(1);

  const paginatedUpdates = updates
    .sort((a, b) => b.id - a.id)
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const totalPages = Math.ceil(updates.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-[#0A0E1A] text-white px-6 py-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Project Updates</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {paginatedUpdates.map((update) => (
          <div
            key={update.id}
            className="bg-[#101826] rounded-xl border border-[#1f2b3c] shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-sm text-yellow-400 font-bold mb-2">BCX</div>
              <h3 className="text-lg font-semibold leading-tight mb-2">
                {update.title}{' '}
                <span className="text-yellow-400">{update.highlight}</span>
              </h3>
              <p className="text-sm text-gray-300 mb-6">{update.description}</p>
            </div>
            <div className="mt-auto">
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <CalendarDaysIcon className="h-4 w-4 mr-1" />
                {update.date}
              </div>
              <div className="font-bold text-white mb-1">{update.release}</div>
              <p className="text-sm text-gray-300 mb-2">{update.description}</p>
              <a href="#" className="text-yellow-400 text-sm font-semibold hover:underline">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const pageIndex = i + 1;
          const isActive = pageIndex === page;
          return (
            <button
              key={i}
              onClick={() => setPage(pageIndex)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-yellow-400 text-black'
                  : 'bg-[#1b2533] text-white hover:bg-[#2c394f]'
              }`}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectUpdates;
