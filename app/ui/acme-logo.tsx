import { GlobeAltIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BuildingOffice2Icon className="h-20 w-20" />
      <p className="text-[30px]">ADM</p>
    </div>
  );
}
