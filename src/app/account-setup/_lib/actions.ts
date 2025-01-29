import { auth } from '@/lib/auth';
import supabase from '@/lib/supabase';
import { getUser, updateUser } from '@/services/data-service';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import { ProfileSchema } from './types';

export async function updateProfile(User: unknown) {
	const result = ProfileSchema.safeParse(User);

	if (!result.success) {
		let errorMessage = '';

		result.error.issues.forEach((issue) => {
			errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
		});

		return {
			error: errorMessage,
		};
	}

	const userProfile = {
		first_name: result.data.first_name,
		last_name: result.data.last_name,
		email: result.data.email,
		subscribe_newsletter: result.data.subscribe,
		isNewUser: false,
	};

	await updateUser(userProfile);

	if (result.success) {
		return { message: 'Success!' };
	}
}

export async function isNewUser() {
	const session = await auth();
	if (!session) {
		return null;
	}

	const user = await getUser(session.user.phone_number);

	return user.isNewUser;
}

type UploadProps = {
	file: File;
	bucket: string;
	folder?: string;
};

export const uploadImage = async ({ file, bucket, folder }: UploadProps) => {
	const fileName = file.name;
	const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
	const path = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExtension}`;

	try {
		file = await imageCompression(file, {
			maxSizeMB: 1,
		});
	} catch (error) {
		console.error(error);
		return { imageUrl: '', error: 'Image compression failed' };
	}

	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(path, file);

	if (error) {
		return { imageUrl: '', error: 'Image upload failed' };
	}

	const imageUrl = `${process.env
		.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
		data?.path
	}`;

	return { imageUrl, error: '' };
};
