import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EditProfileForm = ({ profile, onSave, onCancel, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    // Load the existing profile data into the form
    defaultValues: {
      name: profile?.name || '',
      title: profile?.title || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      university: profile?.university || '',
      github_url: profile?.github_url || '',
      linkedin_url: profile?.linkedin_url || '',
    },
  });

  // The 'data' object here contains all the form fields
  const handleFormSubmit = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-xl shadow-brand border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Edit Your Profile</h2>
        <div className="flex space-x-2">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="default" loading={loading} iconName="Save">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Name and Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          id="name"
          placeholder="e.g., Ada Lovelace"
          error={errors.name}
          {...register("name", { required: "Name is required" })}
        />
        <Input
          label="Title / Headline"
          id="title"
          placeholder="e.g., Computer Science Student"
          error={errors.title}
          {...register("title", { required: "Title is required" })}
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
          Biography
        </label>
        <textarea
          id="bio"
          rows={5}
          className="w-full pl-4 pr-4 py-2 border rounded-lg bg-[--color-input] brand-transition focus:ring-2 focus:ring-[--color-ring] focus:border-[--color-primary] border-[--color-border]"
          placeholder="Tell everyone a bit about yourself..."
          {...register("bio")}
        />
      </div>

      {/* Location and University */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Location"
          id="location"
          placeholder="e.g., San Francisco, CA"
          {...register("location")}
        />
        <Input
          label="University / Institution"
          id="university"
          placeholder="e.g., Stanford University"
          {...register("university")}
        />
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="GitHub URL"
          id="github_url"
          placeholder="https://github.com/username"
          {...register("github_url")}
        />
        <Input
          label="LinkedIn URL"
          id="linkedin_url"
          placeholder="https://linkedin.com/in/username"
          {...register("linkedin_url")}
        />
      </div>
    </form>
  );
};

export default EditProfileForm;