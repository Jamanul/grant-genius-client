import React from 'react';
import { FaCalendar, FaClock, FaLocationDot } from 'react-icons/fa6';

const UpcomingEvents = () => {
    const eventData =
        [
          {
            "id": "1",
            "title": "National Merit Scholarship Information Session",
            "image": "https://i.ibb.co/7bk0f6T/1c3b5bb77e1c56c836f9e57a5b825124.jpg",
            "date": "2024-07-15",
            "time": "10:00 AM - 12:00 PM",
            "location": {
              "venue": "City Library Auditorium",
              "address": "Anytown, USA",
              "zip_code": "12345"
            },
            "description": "An informational session for students interested in applying for the National Merit Scholarship. Learn about eligibility criteria, application process, and tips for success.",
            "contact": {
              "name": "John Doe",
              "email": "john.doe@example.com",
              "phone": "555-123-4567"
            }
          },
          {
            "id": "2",
            "title": "STEM Scholarship Fair",
            "image": "https://i.ibb.co/C8yPw8C/1846f9df3007241eeccddede8b8f435b.jpg",
            "date": "2024-08-01",
            "time": "09:00 AM - 3:00 PM",
            "location": {
              "venue": "Tech Convention Center",
              "address": "Techville, USA",
              "zip_code": "67890"
            },
            "description": "Meet representatives from various organizations offering scholarships for STEM students. Participate in workshops and get advice on crafting a winning application.",
            "contact": {
              "name": "Jane Smith",
              "email": "jane.smith@example.com",
              "phone": "555-234-5678"
            }
          },
          {
            "id": "3",
            "title": "Art and Design Scholarship Workshop",
            "image": "https://i.ibb.co/bdrSWn2/6fc22f1a34f55b187f9a908c0dfe5f5e.jpg",
            "date": "2024-09-05",
            "time": "01:00 PM - 4:00 PM",
            "location": {
              "venue": "Art Institute Gallery",
              "address": "Art City, USA",
              "zip_code": "54321"
            },
            "description": "A workshop for students applying for scholarships in art and design. Learn how to create a standout portfolio and write a compelling personal statement.",
            "contact": {
              "name": "Emily Turner",
              "email": "emily.turner@example.com",
              "phone": "555-345-6789"
            }
          }
        ]

    return (
        <div>
            <h2 className='text-3xl md:text-5xl'>
                Upcoming Events.
            </h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    eventData.map(data=><div key={data.id} className="card bg-base-100 shadow-xl">
                    <figure><img className='w-80 ' src={data.image} alt="Shoes" /></figure>
                    
                    <div className="card-body text-left">
                      <h2 className="card-title">{data.title}</h2>
                      <p>{data.description}</p>
                      <div className='flex flex-col md:flex-row gap-2 md:gap-6 my-2'>
                        <div className='flex gap-2 items-center'>
                            <FaCalendar className='text-xl text-[#0AB99D]'/> {data.date}
                        </div>
                        <div className='flex gap-2 items-center'>
                            <FaLocationDot className='text-xl text-[#0AB99D]'/> {data.location.address}
                        </div>
                    </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default UpcomingEvents;