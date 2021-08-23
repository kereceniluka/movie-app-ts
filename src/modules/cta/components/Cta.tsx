import { FC } from 'react';

const Cta: FC = () => {
    return (
        <section className="flex flex-col items-center justify-center mt-10 mb-6 md:my-14 lg:my-20 px-6">
            <h2 className="text-4xl lg:text-5xl text-center font-bold leading-tight lg:leading-loose">
                Let MovieApp be your guide
            </h2>
            <p className="text-gray-500 text-center lg:text-xl my-10 md:my-5">
                Millions of movies, TV shows and people to discover.
            </p>
        </section>
    );
};

export default Cta;
