/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import { cn } from '@/lib/utils';

export const User: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${cn(className)} text-current`} fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
  </svg>
);

export const SealError: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
    <g clipPath="url(#clip0_360_1098)">
      <path d="M9.04144 1.10041C9.60921 0.68369 10.2951 0.458984 10.9994 0.458984C11.7037 0.458984 12.3897 0.68369 12.9574 1.10041L14.2178 2.02625C14.469 2.20958 14.7614 2.3315 15.0694 2.37825L16.6149 2.61566C17.311 2.72239 17.9549 3.0484 18.453 3.54628C18.951 4.04416 19.2772 4.68794 19.3842 5.384L19.6216 6.93041C19.6683 7.23841 19.7894 7.53083 19.9736 7.782L20.8994 9.04241C21.3162 9.61019 21.5409 10.2961 21.5409 11.0004C21.5409 11.7047 21.3162 12.3906 20.8994 12.9584L19.9736 14.2188C19.7892 14.4701 19.6685 14.7623 19.6216 15.0704L19.3842 16.6159C19.2775 17.312 18.9514 17.9559 18.4536 18.4539C17.9557 18.952 17.3119 19.2782 16.6159 19.3852L15.0694 19.6226C14.7613 19.6694 14.4691 19.7902 14.2178 19.9746L12.9574 20.9004C12.3897 21.3171 11.7037 21.5418 10.9994 21.5418C10.2951 21.5418 9.60921 21.3171 9.04144 20.9004L7.78102 19.9746C7.52973 19.7902 7.23755 19.6694 6.92944 19.6226L5.38394 19.3852C4.68785 19.2784 4.04396 18.9524 3.54591 18.4545C3.04787 17.9567 2.72165 17.3129 2.61469 16.6168L2.37727 15.0704C2.3304 14.7623 2.20962 14.4701 2.02527 14.2188L1.09944 12.9584C0.682713 12.3906 0.458008 11.7047 0.458008 11.0004C0.458008 10.2961 0.682713 9.61019 1.09944 9.04241L2.02527 7.782C2.20952 7.53083 2.33052 7.23841 2.37727 6.93041L2.61469 5.38491C2.72142 4.68882 3.04743 4.04493 3.54531 3.54689C4.04319 3.04885 4.68697 2.72262 5.38302 2.61566L6.92944 2.37825C7.23744 2.3315 7.52985 2.2105 7.78102 2.02625L9.04144 1.10041ZM12.1434 2.20866C11.8117 1.96529 11.4109 1.83407 10.9994 1.83407C10.588 1.83407 10.1872 1.96529 9.85543 2.20866L8.5941 3.1345C8.16426 3.44996 7.66455 3.65689 7.13752 3.73766L5.59202 3.97416C5.18507 4.03668 4.80866 4.22736 4.51752 4.5185C4.22639 4.80964 4.0357 5.18604 3.97319 5.593L3.73669 7.1385C3.65591 7.66581 3.44899 8.16581 3.13352 8.59599L2.20769 9.85641C1.96431 10.1882 1.83309 10.5889 1.83309 11.0004C1.83309 11.4119 1.96431 11.8126 2.20769 12.1444L3.13352 13.4057C3.44898 13.8356 3.65591 14.3353 3.73669 14.8623L3.97319 16.4078C4.03574 16.8147 4.22647 17.1909 4.51761 17.4819C4.80876 17.7729 5.18514 17.9634 5.59202 18.0257L7.13752 18.2641C7.66476 18.3445 8.16476 18.5511 8.59502 18.8663L9.85543 19.7922C10.1872 20.0355 10.588 20.1668 10.9994 20.1668C11.4109 20.1668 11.8117 20.0355 12.1434 19.7922L13.4048 18.8663C13.8346 18.5509 14.3343 18.3439 14.8613 18.2632L16.4069 18.0267C16.8137 17.9641 17.19 17.7734 17.4809 17.4822C17.7719 17.1911 17.9624 16.8147 18.0248 16.4078L18.2631 14.8623C18.3436 14.3351 18.5502 13.8351 18.8653 13.4048L19.7912 12.1444C20.0346 11.8126 20.1658 11.4119 20.1658 11.0004C20.1658 10.5889 20.0346 10.1882 19.7912 9.85641L18.8653 8.59508C18.5499 8.16523 18.343 7.66553 18.2622 7.1385L18.0257 5.593C17.9632 5.18604 17.7725 4.80964 17.4813 4.5185C17.1902 4.22736 16.8138 4.03668 16.4069 3.97416L14.8613 3.73766C14.334 3.65689 13.834 3.44997 13.4039 3.1345L12.1434 2.20866Z" className="fill-current" />
      <path d="M14.3327 14.3337L7.66602 7.66699M14.3327 7.66699L7.66602 14.3337" className="stroke-current" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_360_1098">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export const SealCheck: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" />
  </svg>
);
export const SealWarning: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM120,136V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
  </svg>
);

export const Info: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size- text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
  </svg>
);

export const Warning: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-8 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z" />
  </svg>
);

export const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-2 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

export const Error: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-8 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z" />
  </svg>
);

export const X: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
  </svg>
);

export const Minus: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-2 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" />
  </svg>
);

export const MagnifyingGlass: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
  </svg>
);

export const Moon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" />
  </svg>
);

export const Sun: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
  </svg>
);

export const Circle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${cn(className)} size-2 text-current`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const CaretRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
  </svg>
);

export const CaretLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
  </svg>
);

export const CaretLeftDouble: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M205.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L131.31,128ZM51.31,128l74.35-74.34a8,8,0,0,0-11.32-11.32l-80,80a8,8,0,0,0,0,11.32l80,80a8,8,0,0,0,11.32-11.32Z" />
  </svg>
);

export const CaretRightDouble: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M50.34,53.66a8,8,0,0,1,11.32-11.32l80,80a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32-11.32L124.69,128ZM204.69,128,130.34,202.34a8,8,0,0,0,11.32,11.32l80-80a8,8,0,0,0,0-11.32l-80-80a8,8,0,0,0-11.32,11.32Z" />
  </svg>
);

export const CaretDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

export const CaretUp: React.FC<{ className?: string }> = ({ className, ...otherProps }) => (
  <svg className={`${cn(className)} size-4 text-current`} {...otherProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z" />
  </svg>
);

export const Plus: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
    <path className="fill-current" d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
  </svg>
);

export const Eye: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
  </svg>
);
export const EyeSlash: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z" />
  </svg>
);

export const Gear: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" />
  </svg>
);

export const SignOut: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
  </svg>
);
export const Pencil: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
  </svg>
);

export const ArrowClockwise: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z" />
  </svg>
);

export const Fish: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`${cn(className)} size-4 text-current`}
    fill="#000000"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <g>
          <path
            className="fill-current"
            d="M297.92,246.72l-4.373-4.8c-2.453-2.56-5.12-5.547-8-8.853c-15.787-17.707-39.573-44.587-74.453-61.333
            c-5.333-2.56-11.733-0.32-14.187,5.013c-0.64,1.387-1.067,2.987-1.6,4.587V252.8c-31.36,14.933-58.56,38.08-75.093,58.133
            c-18.773-17.173-46.827-36.16-76.373-51.2c-5.227-2.667-11.627-0.64-14.4,4.693c-0.747,1.493-1.173,3.2-1.173,4.907
            c0,26.133,10.347,56.213,19.84,78.293C40,364.907,28.693,394.24,28.693,424c0,5.867,4.8,10.667,10.667,10.667
            c1.707,0,3.307-0.427,4.907-1.173c29.547-15.04,56.96-33.6,75.947-51.2c16.533,20.053,43.733,43.2,76.16,58.133v60.907
            C195.84,507.2,200.64,512,206.507,512c1.6,0,3.2-0.32,4.587-1.067c31.253-14.933,58.24-34.133,80.32-56.96
            c73.6-14.4,152.853-83.627,152.853-107.307C444.267,321.707,381.867,273.92,297.92,246.72z M284.693,433.28
            c-2.24,0.427-4.373,1.493-5.973,3.2c-17.813,18.773-38.507,34.56-61.12,47.04v-50.24c0-4.267-2.56-8.107-6.507-9.813
            c-36.373-15.36-66.667-42.987-80.427-63.573c-1.813-2.667-4.8-4.373-8-4.693h-0.853c-2.987,0-5.76,1.173-7.787,3.413
            c-10.987,11.84-32.32,29.333-61.76,46.293c2.773-16.533,8.853-34.88,17.707-52.587c1.387-2.88,1.493-6.187,0.213-9.067
            C61.12,322.987,54.933,304,52.053,288c29.867,17.067,51.2,34.453,62.08,46.187c4.053,4.373,10.773,4.587,15.04,0.533
            c0.64-0.533,1.173-1.173,1.6-1.813c13.867-20.587,44.053-48.107,80.427-63.573c3.947-1.707,6.507-5.547,6.507-9.813v-60.373
            c22.933,14.507,39.68,33.387,52.48,47.787c3.093,3.413,5.867,6.613,8.213,9.173l6.187,6.827c1.28,1.387,2.88,2.453,4.693,2.987
            c86.933,27.52,130.773,69.44,134.08,80.213C417.92,360.853,351.787,421.76,284.693,433.28z"
          />
          <path
            className="fill-current"
            d="M350.4,320c-8.853,0-16,7.147-16,16s7.147,16,16,16s16-7.147,16-16S359.253,320,350.4,320z M350.4,341.333
            c-2.987,0-5.333-2.347-5.333-5.333c0-2.987,2.347-5.333,5.333-5.333s5.333,2.347,5.333,5.333
            C355.733,338.987,353.387,341.333,350.4,341.333z"
          />
          <path
            className="fill-current"
            d="M441.067,149.333c-23.573,0-42.667,19.093-42.667,42.667c0,23.573,19.093,42.667,42.667,42.667
            c23.573,0,42.667-19.093,42.667-42.667C483.733,168.427,464.64,149.333,441.067,149.333z M441.067,213.333
            c-11.733,0-21.333-9.6-21.333-21.333s9.6-21.333,21.333-21.333S462.4,180.267,462.4,192S452.907,213.333,441.067,213.333z"
          />
          <path
            className="fill-current"
            d="M377.067,128c35.307,0,64-28.693,64-64s-28.693-64-64-64c-35.307,0-64,28.693-64,64
            C313.173,99.307,341.76,128,377.067,128z M377.067,21.333c23.573,0,42.667,19.093,42.667,42.667
            c0,23.573-19.093,42.667-42.667,42.667c-23.573,0-42.667-19.093-42.667-42.667C334.4,40.427,353.493,21.333,377.067,21.333z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const Funnel: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z" />
  </svg>
);

export const ArrowsDownUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
    <path className="fill-current" d="M117.66,170.34a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L72,188.69V48a8,8,0,0,1,16,0V188.69l18.34-18.35A8,8,0,0,1,117.66,170.34Zm96-96-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L168,67.31V208a8,8,0,0,0,16,0V67.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z" />
  </svg>
);

export const ClearSorting: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0 C2.56312638 0.95754575 3.85566401 2.17183587 5.77798462 4.11505127 C6.47840881 4.81570206 7.17883301 5.51635284 7.90048218 6.23823547 C9.01788788 7.37886696 9.01788788 7.37886696 10.15786743 8.5425415 C10.92906921 9.31798813 11.700271 10.09343475 12.49484253 10.89237976 C14.95734953 13.37168467 17.40922377 15.86121517 19.86099243 18.35113525 C21.52827152 20.03345965 23.19623213 21.71510892 24.86489868 23.39605713 C28.95487146 27.519114 33.03616164 31.65061584 37.11099243 35.78863525 C42.09710453 31.6263052 46.70421808 27.27211446 51.21646118 22.6050415 C52.54204009 21.25224667 53.86822943 19.90004976 55.19497681 18.54840088 C57.26153837 16.43834837 59.32394489 14.3247976 61.37637329 12.20098877 C63.37429538 10.13679276 65.38749481 8.08860356 67.40396118 6.0425415 C68.01757004 5.39998917 68.63117889 4.75743683 69.26338196 4.09541321 C69.84110855 3.51408127 70.41883514 2.93274933 71.0140686 2.33380127 C71.5170195 1.81673111 72.0199704 1.29966095 72.53816223 0.766922 C74.11099243 -0.21136475 74.11099243 -0.21136475 76.17863464 0.02493286 C78.79936122 1.06069092 80.25385576 2.59383638 82.22036743 4.6050415 C83.35151978 5.7506958 83.35151978 5.7506958 84.50552368 6.91949463 C85.28282837 7.72193604 86.06013306 8.52437744 86.86099243 9.35113525 C87.65376587 10.15744385 88.44653931 10.96375244 89.26333618 11.79449463 C91.2194629 13.78597303 93.16824962 15.78411246 95.11099243 17.78863525 C93.73483883 20.88042661 92.15940798 22.98502279 89.7628479 25.36383057 C89.0822934 26.04423401 88.40173889 26.72463745 87.70056152 27.42565918 C86.9671756 28.14872253 86.23378967 28.87178589 85.47817993 29.61676025 C84.7263443 30.36576599 83.97450867 31.11477173 83.19989014 31.88647461 C80.79991342 34.27526545 78.39307234 36.65700422 75.98599243 39.03863525 C74.35662891 40.65796695 72.72771709 42.27775327 71.09927368 43.89801025 C67.10840438 47.8668403 63.11187828 51.82990424 59.11099243 55.78863525 C60.48714603 58.88042661 62.06257689 60.98502279 64.45913696 63.36383057 C65.13969147 64.04423401 65.82024597 64.72463745 66.52142334 65.42565918 C67.25480927 66.14872253 67.98819519 66.87178589 68.74380493 67.61676025 C69.87155838 68.74026886 69.87155838 68.74026886 71.02209473 69.88647461 C73.42207144 72.27526545 75.82891252 74.65700422 78.23599243 77.03863525 C79.86535595 78.65796695 81.49426778 80.27775327 83.12271118 81.89801025 C87.11358049 85.8668403 91.11010658 89.82990424 95.11099243 93.78863525 C92.71702482 98.79749891 89.12042249 102.18576726 85.23599243 106.10113525 C84.51540649 106.85459229 83.79482056 107.60804932 83.05239868 108.38433838 C82.35243774 109.09138916 81.65247681 109.79843994 80.93130493 110.5269165 C80.29466919 111.17700684 79.65803345 111.82709717 79.00210571 112.49688721 C77.11099243 113.78863525 77.11099243 113.78863525 75.22198486 113.57727051 C72.65885848 112.61972476 71.36632085 111.40543464 69.44400024 109.46221924 C68.74357605 108.76156845 68.04315186 108.06091766 67.32150269 107.33903503 C66.57656555 106.57861404 65.83162842 105.81819305 65.06411743 105.034729 C64.29291565 104.25928238 63.52171387 103.48383575 62.72714233 102.68489075 C60.26463533 100.20558584 57.8127611 97.71605534 55.36099243 95.22613525 C53.69371334 93.54381086 52.02575274 91.86216158 50.35708618 90.18121338 C46.26711341 86.05815651 42.18582322 81.92665467 38.11099243 77.78863525 C33.12488033 81.95096531 28.51776678 86.30515605 24.00552368 90.972229 C22.67994478 92.32502384 21.35375543 93.67722074 20.02700806 95.02886963 C17.9604465 97.13892214 15.89803998 99.25247291 13.84561157 101.37628174 C11.84768948 103.44047775 9.83449005 105.48866695 7.81802368 107.534729 C7.20441483 108.17728134 6.59080597 108.81983368 5.95860291 109.4818573 C5.38087631 110.06318924 4.80314972 110.64452118 4.20791626 111.24346924 C3.70496536 111.7605394 3.20201447 112.27760956 2.68382263 112.81034851 C1.11099243 113.78863525 1.11099243 113.78863525 -0.95664978 113.55233765 C-3.57737635 112.51657959 -5.03187089 110.98343413 -6.99838257 108.972229 C-7.75248413 108.20845947 -8.50658569 107.44468994 -9.28353882 106.65777588 C-10.44949585 105.45411377 -10.44949585 105.45411377 -11.63900757 104.22613525 C-12.82816772 103.01667236 -12.82816772 103.01667236 -14.04135132 101.78277588 C-15.99747803 99.79129748 -17.94626476 97.79315804 -19.88900757 95.78863525 C-18.51285397 92.6968439 -16.93742311 90.59224772 -14.54086304 88.21343994 C-13.52003128 87.19283478 -13.52003128 87.19283478 -12.47857666 86.15161133 C-11.74519073 85.42854797 -11.01180481 84.70548462 -10.25619507 83.96051025 C-9.50435944 83.21150452 -8.7525238 82.46249878 -7.97790527 81.6907959 C-5.57792856 79.30200505 -3.17108748 76.92026628 -0.76400757 74.53863525 C0.86535595 72.91930356 2.49426778 71.29951724 4.12271118 69.67926025 C8.11358049 65.71043021 12.11010658 61.74736627 16.11099243 57.78863525 C14.73483883 54.6968439 13.15940798 52.59224772 10.7628479 50.21343994 C10.0822934 49.5330365 9.40173889 48.85263306 8.70056152 48.15161133 C7.9671756 47.42854797 7.23378967 46.70548462 6.47817993 45.96051025 C5.7263443 45.21150452 4.97450867 44.46249878 4.19989014 43.6907959 C1.79991342 41.30200505 -0.60692766 38.92026628 -3.01400757 36.53863525 C-4.64337109 34.91930356 -6.27228291 33.29951724 -7.90072632 31.67926025 C-11.89159562 27.71043021 -15.88812172 23.74736627 -19.88900757 19.78863525 C-17.49503996 14.7797716 -13.89843762 11.39150325 -10.01400757 7.47613525 C-9.29342163 6.72267822 -8.57283569 5.96922119 -7.83041382 5.19293213 C-7.13045288 4.48588135 -6.43049194 3.77883057 -5.70932007 3.050354 C-5.07268433 2.40026367 -4.43604858 1.75017334 -3.78012085 1.0803833 C-1.88900757 -0.21136475 -1.88900757 -0.21136475 0 0 Z " fill="#fff" transform="translate(194.88900756835938,139.21136474609375)" />
    <path d="M0 0 C75.57 0 151.14 0 229 0 C229 8.91 229 17.82 229 27 C153.43 27 77.86 27 0 27 C0 18.09 0 9.18 0 0 Z " fill="#fff" transform="translate(10,47)" />
    <path d="M0 0 C50.49 0 100.98 0 153 0 C153 8.91 153 17.82 153 27 C102.51 27 52.02 27 0 27 C0 18.09 0 9.18 0 0 Z " fill="#fff" transform="translate(10,113)" />
    <path d="M0 0 C25.41 0 50.82 0 77 0 C77 8.91 77 17.82 77 27 C51.59 27 26.18 27 0 27 C0 18.09 0 9.18 0 0 Z " fill="#fff" transform="translate(10,179)" />
  </svg>
);
