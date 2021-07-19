import { FC } from 'react';

const SearchResults: FC = ({ children }) => {
    return (
        <section className="grid grid-cols-6 gap-8">
            {children}
        </section>
    );
}

export default SearchResults;
