import React from 'react'

function NewsCard({ title, published_at, content, imageUrl, url }) {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-6 pb-0">
                    <img src={imageUrl} alt="Avatar" className="w-12 h-12 rounded-full" />
                    <div className='flex flex-col mb-1'>
                        <p className=' text-lg text-black'>Published on:</p>
                        <p className="text-gray-600">{new Date(published_at).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <a href={url}>
                        <h2 className={`font-bold mb-4 line-clamp-2 ${title.length > 25 ? ' text-lg' : 'text-xl'}`}>
                            {title}
                        </h2>
                    </a>

                    <div
                        className="prose max-w-none line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: content.replace(/<[^>]+>/g, '') }}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewsCard