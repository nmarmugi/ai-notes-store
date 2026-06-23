import Typography from "../atoms/Typography";

interface IEmptyState {
    message: string;
}

export default function EmptyState({ message }: IEmptyState) {
    return (
        <Typography>
            {message}
        </Typography>
    );
}
