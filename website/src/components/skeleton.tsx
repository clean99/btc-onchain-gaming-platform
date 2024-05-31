import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export const SkeletonCardGroup = ({
    count = 3,
}) => {
    const list = new Array(count).fill(0);
    return (
        <>
            {list.map((item, index) => (
                <Card key={index} className="space-y-5 p-4 bg-gray-900" radius="lg">
                    <Skeleton className="rounded-lg min-h-[130px]  xl:min-h-[360px]">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">  
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    </div>
                </Card>
            ))}
        </>
    );
};