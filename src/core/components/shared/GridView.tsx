import { FC } from 'react';

const SearchResults: FC = ({ children }) => {
    return (
        <section className="grid place-items-center gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 my-28">
            {children}
        </section>
    );
};

export default SearchResults;
