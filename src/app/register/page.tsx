"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Store, CheckCircle2, Image as ImageIcon, MapPin, Clock, FileText, Loader2, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { shopRegister } from "@/services/apiService";
import CategorySelection from "@/components/CategorySelection";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false });

export default function RegisterShopPage() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [photoPreviews, setPhotoPreviews] = useState<(string | null)[]>([null, null, null, null]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([13.0827, 80.2707]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [mounted, setMounted] = useState(false);

  const handleSelectPlace = async (place: any) => {
    setSearchQuery(place.description);
    setPlaces([]);
    try {
      const res = await fetch(`/api/places?place_id=${place.place_id}`);
      const data = await res.json();
      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setMapCenter([lat, lng]);
        setSelectedAddress(place.description);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!searchQuery.trim()) {
      setPlaces([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?input=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.predictions) {
          setPlaces(data.predictions);
        }
      } catch (err) {
        console.error(err);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (logoFile) formData.append("shopImage", logoFile);
      if (photoFiles[0]) formData.append("image1", photoFiles[0]);
      if (photoFiles[1]) formData.append("image2", photoFiles[1]);
      if (photoFiles[2]) formData.append("image3", photoFiles[2]);
      if (photoFiles[3]) formData.append("image4", photoFiles[3]);
      
      formData.append("shopName", data.shopName || "");
      formData.append("category", data.category || "");
      formData.append("lat", mapCenter[0].toString());
      formData.append("long", mapCenter[1].toString());
      formData.append("description", data.description || "");
      formData.append("openTime", data.openTime || "");
      formData.append("closeTime", data.closeTime || "");
      formData.append("address", data.address || "");
      formData.append("registerNumber", data.registerMobile || "");
      formData.append("shopNumber", data.shopContact || "");
      formData.append("whatsappNumber", data.whatsappNumber || "");
      formData.append("type", "add");

      await shopRegister(formData);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

  const handlePhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPreviews = [...photoPreviews];
      newPreviews[index] = url;
      setPhotoPreviews(newPreviews);
      const newFiles = [...photoFiles];
      newFiles[index] = file;
      setPhotoFiles(newFiles);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <h1 className="text-3xl font-bold font-heading mb-4">Registration Successful!</h1>
        <p className="text-slate-500 max-w-md mb-8">Your shop has been registered and is pending approval. You will be notified once it is live on MAPMAN.</p>
        <div className="flex gap-4">
          <Link href="/shoplist" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">Go to Shop List</Link>
          <Link href="/profile" className="bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-xl font-bold transition-colors">Back to Profile</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 px-2 lg:px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Store className="w-10 h-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-heading mb-4 text-slate-900 dark:text-white">Register Your Business</h1>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium">Join the MAPMAN platform and connect with thousands of local customers. Fill in the essential details below.</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 md:p-8 rounded-[2rem] border border-white/50 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-10" />

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left Side: Media Section */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-2xl font-extrabold font-heading flex items-center gap-3 text-slate-800 dark:text-white">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><ImageIcon className="w-5 h-5" /></span> Shop Media
              </h2>
              <div className="flex flex-col gap-6">
                <div className="w-full aspect-square border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-[2rem] p-6 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/50 hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden group">
                  {logoPreview ? (
                    <>
                      <img src={logoPreview} alt="Shop Image" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center flex flex-col items-center">
                      <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <ImageIcon className="w-8 h-8 text-primary" />
                      </div>
                      <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Shop Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-full h-full min-h-[120px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/50 hover:bg-accent/5 hover:border-accent/50 transition-all cursor-pointer relative group overflow-hidden">
                    {photoPreviews[i] ? (
                      <img src={photoPreviews[i]!} alt={`Photo ${i+1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-slate-400 group-hover:scale-110 transition-transform duration-300 mb-2" />
                        <span className="text-xs font-bold text-slate-500">Photo {i+1}</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(i, e)} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                  </div>
                ))}
              </div>
            </div>
            </div>

            {/* Right Side: Details & Contact */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Details Section */}
              <div>
                <h2 className="text-2xl font-extrabold font-heading mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><FileText className="w-5 h-5" /></span> Shop Details
                </h2>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
              
              <div className="col-span-full md:col-span-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Shop Name</label>
                <input {...register("shopName", { required: true })} placeholder="Enter shop name" className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner" />
              </div>
              
              <div className="col-span-full">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Category Selection</label>
                <input type="hidden" {...register("category", { required: true })} />
                <CategorySelection 
                  selectedCategory={watch("category") || ""} 
                  onSelect={(cat) => setValue("category", cat)}
                />
              </div>

              <div className="col-span-full">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location Address</label>
                <div className="relative cursor-pointer" onClick={() => setIsMapOpen(true)}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-slate-400" />
                  </div>
                  <input {...register("address", { required: true })} readOnly placeholder="Click to select location on map" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner cursor-pointer" />
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Description</label>
                <textarea {...register("description")} placeholder="Briefly describe your shop..." rows={3} className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner resize-none" />
              </div>

              <div className="col-span-full">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Website Link (Optional)</label>
                <input {...register("website")} placeholder="https://" className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner" />
              </div>

            </div>
          </div>

          {/* Contact & Timing Section */}
          <div>
            <h2 className="text-2xl font-extrabold font-heading mb-6 flex items-center gap-3 text-slate-800 dark:text-white pt-6 border-t border-slate-100 dark:border-slate-800/50">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Clock className="w-5 h-5" /></span> Contact & Timing
            </h2>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Register Mobile Number</label>
                <input {...register("registerMobile", { required: true })} placeholder="Mobile Number" className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner" />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">WhatsApp Number</label>
                <input {...register("whatsappNumber")} placeholder="WhatsApp Number" className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner" />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Shop Contact Number</label>
                <input {...register("shopContact")} placeholder="Shop Contact" className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Open Time</label>
                  <input type="time" {...register("openTime")} className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Close Time</label>
                  <input type="time" {...register("closeTime")} className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold shadow-inner" />
                </div>
              </div>

            </div>
          </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-5 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl shadow-primary/25 disabled:opacity-70 disabled:hover:scale-100 text-lg mt-10"
              >
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><CheckCircle2 className="w-6 h-6" /> Submit Registration</>}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Map Drawer */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMapOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" onClick={() => setIsMapOpen(false)} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white dark:bg-slate-900 shadow-2xl z-[110] flex flex-col">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4 bg-white dark:bg-slate-900 z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-heading flex items-center gap-2"><MapPin className="text-primary" /> Select Location</h3>
                    <button type="button" onClick={() => setIsMapOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for area, street..." 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium shadow-inner" 
                    />
                    {places.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-60 overflow-y-auto">
                        {places.map((place) => (
                          <div 
                            key={place.place_id} 
                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-700/50 last:border-0 flex items-start gap-3 transition-colors"
                            onClick={() => handleSelectPlace(place)}
                          >
                            <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{place.structured_formatting?.main_text || place.description}</p>
                              {place.structured_formatting?.secondary_text && (
                                <p className="text-xs text-slate-500 line-clamp-1">{place.structured_formatting.secondary_text}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 relative bg-slate-200 dark:bg-slate-800">
                  <MapPicker center={mapCenter} />
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  {selectedAddress ? (
                    <div className="mb-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3 shadow-sm">
                      <div className="mt-1 p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Selected Location</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white line-clamp-2">{selectedAddress}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 mb-4">Search for an area to place your shop pin accurately.</p>
                  )}
                  <button 
                    type="button" 
                    onClick={() => {
                      setValue("address", selectedAddress);
                      setIsMapOpen(false);
                    }}
                    disabled={!selectedAddress}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Confirm Location
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
