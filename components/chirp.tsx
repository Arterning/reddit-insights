"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function Chirp({ chirp }) {
  const [editing, setEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [title, setTitle] = useState(chirp.title);
  const [body, setBody] = useState(chirp.body);

  const deleteChirp = async () => {
    try {
      await axios.delete(`/api/note/${chirp.id}`);
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }
    toast.success("Chirp deleted");
    //window.location.reload();
    setIsDeleted(true);
  };

  const updateChirp = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/note/${chirp.id}`, {
        title,
        body,
      });
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }
    toast.success("Chirp updated");
    setEditing(false);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="p-6 flex space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600 -scale-x-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      {editing ? (
        <div className="flex-1">
          <form className="space-y-3">
            <div className="flex justify-between items-center">
              <Button size="sm" type={"submit"} onClick={updateChirp}>
                Update
              </Button>
              <Button variant="link" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
            <Input
              name="title"
              placeholder={"title"}
              className={"p-3"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              name="body"
              value={body}
              className="h-60"
              placeholder="What's on your mind?"
              onChange={(e) => setBody(e.target.value)}
            />
          </form>
        </div>
      ) : (
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-800">ArterNing</span>
              <small className="ml-2 text-sm text-gray-600">{title}</small>
              <Button
                size="sm"
                variant="link"
                onClick={() => setEditing(true)}
                className="ml-3"
              >
                Edit
              </Button>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. After Delete you will not be
                      able to view this note. <br />
                      <br />
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          deleteChirp();
                          e.preventDefault();
                        }}
                      >
                        Proceed{" "}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <pre className="mt-4 text-lg text-gray-900 whitespace-pre-wrap font-semibold">
            {body}
          </pre>
        </div>
      )}
    </div>
  );
}
