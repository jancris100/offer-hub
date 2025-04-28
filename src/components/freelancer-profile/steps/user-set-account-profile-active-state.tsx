'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

export default function UserSetAccountProfileActiveState({ prevStep, nextStep }: { prevStep: () => void; nextStep: () => void }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        dateOfBirth: '',
        country: '',
        streetAddress: '',
        aptSuite: '',
        city: '',
        stateProvince: '',
        zipPostalCode: '',
        phoneNumber: '',
    });
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        // Aquí guardarías los datos y luego avanzarías
        nextStep();
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Título y subtítulo */}
            <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-2">10/10</p>
                <h1 className="text-3xl font-bold text-[#19213D] mb-4">
                    A few last details, then you can check and publish your profile.
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Now, let’s set your hourly rate. Clients will see this rate on your profile and in search results once you
                    publish your profile. You can adjust your rate every time you submit a proposal.
                </p>
            </div>

            {/* Modal para foto */}
            <div className="mb-8">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Upload Profile Photo</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-center">Drag and drop or click to upload a profile photo (Minimum 250x250)</p>
                            <Input type="file" accept="image/*" />
                        </div>
                        <DialogFooter className="mt-6 flex justify-between">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsModalOpen(false)}>Attach Photo</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Formulario */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Date of Birth */}
                <div className="flex flex-col">
                    <Label className="mb-2">Date of Birth*</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full text-left font-normal ${!dateOfBirth ? 'text-muted-foreground' : ''}`}
                            >
                                {dateOfBirth ? format(dateOfBirth, 'PPP') : 'Select your date of birth'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                selected={dateOfBirth}
                                onSelect={(date) => setDateOfBirth(date)}
                                mode="single"
                                captionLayout="dropdown"
                                fromYear={1900}
                                toYear={new Date().getFullYear()}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Country */}
                <div>
                    <Label>Country*</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="mexico">Mexico</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            {/* Agrega más países aquí */}
                        </SelectContent>
                    </Select>
                </div>

                {/* Street Address */}
                <div className="col-span-1 md:col-span-2">
                    <Label>Street Address*</Label>
                    <Input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
                </div>

                {/* APT/Suite */}
                <div className="col-span-1 md:col-span-2">
                    <Label>APT/Suite (Optional)</Label>
                    <Input type="text" name="aptSuite" value={formData.aptSuite} onChange={handleChange} />
                </div>

                {/* City */}
                <div>
                    <Label>City*</Label>
                    <Input type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>

                {/* State/Province */}
                <div>
                    <Label>State/Province*</Label>
                    <Input type="text" name="stateProvince" value={formData.stateProvince} onChange={handleChange} />
                </div>

                {/* Zip/Postal Code */}
                <div>
                    <Label>Zip/Postal Code*</Label>
                    <Input type="text" name="zipPostalCode" value={formData.zipPostalCode} onChange={handleChange} />
                </div>

                {/* Phone Number */}
                <div>
                    <Label>Phone Number</Label>
                    <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 123 456 7890" />
                </div>
            </form>

            {/* Botones de navegación */}
            <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                    Back
                </Button>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={nextStep}>
                        Skip
                    </Button>
                    <Button onClick={handleSubmit}>
                        Review Your Profile
                    </Button>
                </div>
            </div>
        </div>
    );
}
