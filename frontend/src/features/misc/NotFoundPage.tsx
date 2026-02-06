import { useNavigate } from 'react-router-dom';

import error404 from '@/assets/404.png';
import { Button } from '@/components/ui/button';


export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div>
                <img src={error404} alt="" className="w-75" />
            </div>
            <span className="text-3xl text-neutral-800 font-medium mt-10">
                We couldn&apos;t find the content you were looking for
            </span>

            <span className="mt-2 text-Gray-600">
                If the problem reoccurs please
                <a
                    className="pl-2 text-sky-500 active:outline-none focus:outline-none"
                    href=""
                    rel="noreferrer"
                    target="_blank"
                >
                    contact us
                </a>
            </span>

            <Button
                variant="default"
                size="lg"
                onClick={() => {
                    navigate(-1);
                }}
                className="mt-10 border p-4 rounded-md"
            >
                Go Back to the Previous Page
            </Button>
        </div>
    );
};
