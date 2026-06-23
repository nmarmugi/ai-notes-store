import { FiChevronRight, FiFolder } from "react-icons/fi";
import Card from "../atoms/Card";
import Typography from "../atoms/Typography";

interface IWorkspaceCard {
    title: string;
    subtitle: string;
    firstColor: string;
    secondColor: string;
}

export default function WorkspaceCard({ title, subtitle, firstColor, secondColor }: IWorkspaceCard) {
    return (
        <Card className="w-full cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-sm" style={{ color: firstColor, backgroundColor: secondColor }}>
                    <FiFolder />
                </div>
                <div>
                    <Typography variant="h2">
                        {title}
                    </Typography>
                    <Typography>
                        {subtitle}
                    </Typography>
                </div>
            </div>
            <FiChevronRight className="text-gray" />
        </Card>
    );
}
