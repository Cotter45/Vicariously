import { useState, useEffect, useRef } from "react";
import { ImageUploader } from "./image-upload";

// import { createPost } from "../../models/post.server";
import {
  localStore,
  checkLocalStore,
  checkLocalImageStore,
} from "../../../utils/localstorage";

import type { Category, Rule } from "../../../redux/models";

export default function NewPostPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [address, setAddress] = useState("");
  const [matches, setMatches] = useState([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (errors.title) {
      titleRef.current?.focus();
    } else if (errors.address) {
      addressRef.current?.focus();
    } else if (errors.description) {
      descriptionRef.current?.focus();
    }
  }, [errors]);

  useEffect(() => {
    if (address.length > 5) return;
    setMatches([]);
  }, [address]);

  useEffect(() => {
    if (loaded) return;
    checkLocalImageStore("post_images", setUrls);
    setLoaded(true);
  }, [loaded]);

  const handleMapSearch = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      "/api/mapbox/location?" +
        new URLSearchParams({
          address,
        })
    );
    const locations = await response.json();
    setMatches(locations.features);
  };

  const handleFileUpload = async (file: File) => {
    let inputFormData = new FormData();
    inputFormData.append("image", file);

    const response = await fetch("/api/util/upload_image", {
      method: "POST",
      body: inputFormData,
    });
    let { url } = await response.json();

    setUrls([...urls, url]);

    let postImages: any = localStorage.getItem("post_images");
    let localUrls: any;
    if (postImages) {
      let [, value] = postImages.split("&&");
      localUrls = JSON.parse(value);
    } else {
      localUrls = [];
    }

    localUrls.push(url);
    localStore("post_images", JSON.stringify(localUrls));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    if (titleRef.current) data.append("title", titleRef.current.value);
    if (addressRef.current) data.append("address", addressRef.current.value);
    if (descriptionRef.current)
      data.append("description", descriptionRef.current.value);
    data.append("images", JSON.stringify(urls));

    // submit(data, {
    //   method: "post",
    //   action: "/myposts/new",
    // });
  };

  return (
    <main className="main">
    <form
      method="post"
      className="fade_in my-post bg-white border flex w-full flex-col gap-4 p-8 pt-0"
      onSubmit={handleSubmit}
    >
      <div className="border-b">
        <h1 className="py-4 text-2xl">Create New Post</h1>
      </div>
      <div>
        <label className="form-field flex w-full flex-col gap-1">
          <span className="required text-xl">Title: </span>
          <input
            ref={titleRef}
            name="title"
            defaultValue={checkLocalStore("post_title") || ""}
            onBlur={(e) => localStore("post_title", e.target.value)}
            placeholder="Title of your post"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={errors?.title ? true : undefined}
            aria-errormessage={
              errors?.title ? "title-error" : undefined
            }
          />
        </label>
        {errors?.title && (
          <div className="pt-1 text-red-700" id="title-error">
            {errors.title}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex w-full flex-col gap-1">
          <span className="text-xl">Address: </span>
          <label className="flex w-full flex-col gap-1 pb-2">
            <p className="text-sm text-gray-500">
              * Enter a full address, city, state or zip code and click search
              for a list of searchable locations others can find.
            </p>
          </label>
          <input
            ref={addressRef}
            value={address || checkLocalStore("post_address")}
            name="address"
            onBlur={(e) => localStore("post_address", e.target.value)}
            placeholder="Address or Town of your post"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={errors?.address ? true : undefined}
            aria-errormessage={
              errors?.address ? "address-error" : undefined
            }
            onChange={(e) => {
              if (localStorage.getItem("post_address")) {
                localStorage.removeItem("post_address");
              }
              setAddress(e.target.value);
            }}
          />
        </label>
        {matches &&
          matches.map((match: any) => (
            <div
              onClick={() => {
                setAddress(match.place_name);
                setMatches([]);
                localStore("post_address", match.place_name);
              }}
              key={match.id}
              className="fade_in cursor-pointer rounded border-b border-gray-200 p-2 transition-all hover:bg-gray-300"
            >
              {match.place_name}
            </div>
          ))}
        <button
          onClick={handleMapSearch}
          className="rounded-md bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Search
        </button>
        {errors?.address && (
          <div className="pt-1 text-red-700" id="title-error">
            {errors.address}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex w-full flex-col gap-1">
          <span className="text-xl">Upload Images: </span>
          <label className="flex w-full flex-col gap-1 pb-2">
            {/* TO DO add profile link */}
            <p className="text-sm text-gray-500">
              * Max: 5, Recommended: 5. Manage all uploaded images from your
              profile page at any time.
            </p>
          </label>
        </label>
        <div className="flex flex-wrap justify-center gap-6">
          <ImageUploader onChange={handleFileUpload} imageUrl={urls[0]} />
          <ImageUploader onChange={handleFileUpload} imageUrl={urls[1]} />
          <ImageUploader onChange={handleFileUpload} imageUrl={urls[2]} />
          <ImageUploader onChange={handleFileUpload} imageUrl={urls[3]} />
          <ImageUploader onChange={handleFileUpload} imageUrl={urls[4]} />
        </div>
      </div>

      <div>
        <label className="form-field flex w-full flex-col gap-1">
          <span className="required text-xl">Description: </span>
          <textarea
            ref={descriptionRef}
            name="description"
            defaultValue={checkLocalStore("post_description") || ""}
            onBlur={(e) => localStore("post_description", e.target.value)}
            rows={6}
            placeholder="Brief description of your post"
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            aria-invalid={errors?.description ? true : undefined}
            aria-errormessage={
              errors?.description ? "description-error" : undefined
            }
          />
        </label>
        {errors?.description && (
          <div className="pt-1 text-red-700" id="description-error">
            {errors.description}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </form>
    </main>
  );
}
