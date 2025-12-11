// export function FormWrapper({ title, subtitle, children, illustration }) {
//   return (
//     <div className="min-h-screen flex">
//       {/* Left Panel - Illustration (Hidden on mobile) */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 items-center justify-center relative overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
//         <div className="relative z-10 text-white max-w-md">
//           {illustration || (
//             <>
//               <div className="mb-8">
//                 <svg
//                   className="w-16 h-16 mb-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                   />
//                 </svg>
//                 <h2 className="text-4xl font-bold mb-4">
//                   Welcome to CivicProject
//                 </h2>
//                 <p className="text-primary-100 text-lg leading-relaxed">
//                   Secure authentication system built with modern web technologies.
//                   Your data is protected with industry-standard encryption.
//                 </p>
//               </div>
//               <div className="space-y-4 text-primary-50">
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span>End-to-end encryption</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span>Multi-layer security</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span>24/7 monitoring</span>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Right Panel - Form */}
//       <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
//         <div className="w-full max-w-md">
//           {/* Logo - Mobile */}
//           <div className="lg:hidden mb-8 text-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 mb-4">
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Title & Subtitle */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
//             {subtitle && (
//               <p className="text-gray-600 text-base">{subtitle}</p>
//             )}
//           </div>

//           {/* Form Content */}
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }