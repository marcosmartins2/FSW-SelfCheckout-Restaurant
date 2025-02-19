import { ConsumptionMethod} from '@prisma/client'
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type props = {
  slug: string;
  url: string;
  alt: string;
  text: string;
  option:ConsumptionMethod;
};

const ConsuptionMethodOption = (props: props) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={props.url}
            fill
            alt={props.alt}
            className="object-contain"
          ></Image>
        </div>
        <Link  href={`${props.slug}/menu?consumptionMethod=${props.option}`}>
        <Button variant="secondary" className="rounded-full">
          {props.text}
        </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ConsuptionMethodOption;
