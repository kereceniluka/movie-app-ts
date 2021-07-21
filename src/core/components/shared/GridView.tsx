import { FC } from 'react';

const SearchResults: FC = ({ children }) => {
    return (
        <section className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {children}
        </section>
    );
}

export default SearchResults;
