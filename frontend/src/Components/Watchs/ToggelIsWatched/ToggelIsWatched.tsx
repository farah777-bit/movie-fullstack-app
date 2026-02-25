import React from 'react'
import { MovieCast, WatchlistItemDto } from '../../../types/movies';
import { updateWatchlistWatched } from '../../../api';
type Props = {
    item: WatchlistItemDto;
    onLocalUpdate: (movieId: number, isWatched: boolean) => void;
};

const ToggelIsWatched = ({ item, onLocalUpdate }: Props) => {
  
        const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.checked;

            onLocalUpdate(item.movieId, newValue);
            try {
                await updateWatchlistWatched(item.movieId, newValue);
                console.log(newValue)
            } catch (err) {
                onLocalUpdate(item.movieId, !newValue);
                console.error(err);
            }
        };

        return (
            <div className="flex items-center justify-between gap-3">
                <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm opacity-70">
                        {item.isWatched ? "Watched ✅" : "Not watched ❌"}
                    </div>
                </div>

                <label className="flex items-center gap-2">
                    <span className="text-sm">Watched</span>
                    <input
                        type="checkbox"
                        checked={item.isWatched}
                        onChange={handleToggle}
                    />
                </label>
            </div>
        );
    }

export default ToggelIsWatched